import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import http from 'http';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { appendMessageToFile } from './utils/chatUtils.js'; // Assuming you have a utility for handling chat files
import { validateChatKey, isKeyValid } from './middleware/chatKeyValidator.js'; // Import the middleware
import titleRoute from './routes/title.js';
import resumeRoute from './routes/resume.js';
import profileRoute from './routes/profile.js';
import contactRoute from './routes/contact.js';
import traitsRoute from './routes/traits.js';
import skillsRoute from './routes/skills.js';
import educationRoute from './routes/education.js';
import referencesRoute from './routes/references.js';
import experienceRoute from './routes/experience.js';
import profilePicRoute from './routes/profile-pic.js';
import chatRoute from './routes/chat.js';
import sanitizeHtml from 'sanitize-html';

dotenv.config();
const corsOptions = {
  origin: [
    'http://127.0.0.1:5501',
    'http://localhost:5501',
    'https://www.nextepdesigns.com',
  ],
  methods: ['GET', 'POST'],
};
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.',
});
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['*', 'http://127.0.0.1:5501'],
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ ...corsOptions, optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use(express.static(path.join(__dirname, '../client')));

app.use('/chat', validateChatKey, chatRoute);
app.use('/title', titleRoute);
app.use('/resume', resumeRoute);
app.use('/profile', profileRoute);
app.use('/profile-pic', profilePicRoute);
app.use('/contact', contactRoute);
app.use('/traits', traitsRoute);
app.use('/skills', skillsRoute);
app.use('/education', educationRoute);
app.use('/references', referencesRoute);
app.use('/experience', experienceRoute);

// Tracking active connections
const activeConnections = new Map();
const adminConnections = new Map();

io.on('connection', (socket) => {
  const key = socket.handshake.query['Chat-Key'];
  const isAdmin = socket.handshake.query['Is-Admin'] === 'true';
  console.log(socket.handshake);
  const requestKey = socket.handshake.query['Request-Key'] === 'true';
  console.log(requestKey);
  if (requestKey) {
    console.log('Requesting key');
    //generate new key simple 6 letter uppercase and numbers
    const key = Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      //read permitted keys
      const filePath = path.join(__dirname, 'chats', 'permittedKeys.json');
      let permittedKeys;
      if (fs.existsSync(filePath)) {
        permittedKeys = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        permittedKeys.userKeys.push(key);
        //update permitted keys
        fs.writeFileSync(filePath, JSON.stringify(permittedKeys));
      }
    } catch (err) {
      console.log(err);
    } finally {
      //send key back to client
      socket.emit('return-key', key);
    }

    return;
  }

  // Validate chat key or admin key
  if (!isKeyValid(key, isAdmin)) {
    console.log('Invalid key, disconnecting socket');
    socket.disconnect();
    return;
  }

  // Emit new connection event
  io.emit('new_connection', key);

  if (isAdmin) {
    adminLogic(socket, key);
  } else {
    userLogic(socket, key);
  }

  // Common disconnect logic
  socket.on('disconnect', () => {
    disconnectLogic(socket, key, isAdmin);
  });
});

// Admin-specific logic
function adminLogic(socket, key) {
  console.log('Admin connected');
  adminConnections.set(key, socket.id);
  socket.emit('active chats', Array.from(activeConnections.keys()));

  // Notify users of admin connection
  notifyUsersOfAdminStatus(true);

  // Admin message handler
  socket.on('admin message', (msg, targetKey) => {
    const sanitizedMessage = sanitizeHtml(msg.content, {
      allowedTags: ['a'], // Define allowed HTML tags if any, or keep it empty
      allowedAttributes: {
        a: ['href', 'target'], // Define allowed attributes for the tags
      }, // Define allowed attributes if any
    });
    msg.content = sanitizedMessage;
    processAdminMessage(msg, targetKey, socket);
  });

  // Admin requesting chat history
  socket.on('request history', (selectedChatKey) => {
    const chatHistory = getChatHistory(selectedChatKey);
    socket.emit('chat history', chatHistory);
  });

  // Admin requesting active chats
  socket.on('request active chats', () => {
    socket.emit('active chats', Array.from(activeConnections.keys()));
  });
}

// User-specific logic
function userLogic(socket, key) {
  if (activeConnections.has(key)) {
    console.log('Key already in use, disconnecting socket');
    socket.disconnect();
    return;
  }

  activeConnections.set(key, socket.id);

  // User message handler
  socket.on('chat message', (msg) => {
    const sanitizedMessage = sanitizeHtml(msg.content, {
      allowedTags: [], // Define allowed HTML tags if any, or keep it empty
      allowedAttributes: {}, // Define allowed attributes if any
    });
    msg.content = sanitizedMessage;
    processUserMessage(msg, key, socket);
  });

  // User requesting chat history
  socket.on('request history', () => {
    const chatHistory = getChatHistory(key);
    socket.emit('chat history', chatHistory);
  });
}

// Utility to fetch chat history, extracted for reuse
function getChatHistory(key) {
  const filePath = path.join(__dirname, 'chats', `${key}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Process admin message
function processAdminMessage(msg, targetKey, socket) {
  console.log('Admin Message:', msg);
  try {
    appendMessageToFile(targetKey, msg);
  } catch (error) {
    console.error('Error handling message:', error);
    socket.emit('error', 'Message processing failed.');
    return;
  }

  // Relay message to user and admins
  relayMessageToUserAndAdmins(msg, targetKey);
}

// Process user message
function processUserMessage(msg, key, socket) {
  console.log('Message:', msg);
  try {
    appendMessageToFile(key, msg);
  } catch (error) {
    console.error('Error handling message:', error);
    socket.emit('error', 'Message processing failed.');
    return;
  }

  // Relay message to user and admins
  relayMessageToUserAndAdmins(msg, key);
}

// Relay message to the target user and all admins
function relayMessageToUserAndAdmins(msg, targetKey) {
  const messageObj = { ...msg, time: new Date().toISOString() };
  console.log('messageObj', messageObj);
  // Emit to target user
  const targetUserSocketId = activeConnections.get(targetKey);
  if (targetUserSocketId) {
    io.to(targetUserSocketId).emit('new message', messageObj);
  }

  // Emit to all admin sessions
  adminConnections.forEach((adminSocketId) => {
    io.to(adminSocketId).emit('new message', messageObj, targetKey);
  });
}

// Handle user and admin disconnection
function disconnectLogic(socket, key, isAdmin) {
  console.log(`${isAdmin ? 'Admin' : 'User'} disconnected`);

  if (isAdmin) {
    adminConnections.delete(key);
    notifyUsersOfAdminStatus(false);
  } else {
    activeConnections.delete(key);
    io.emit('connection_ended', key);
  }
}

// Notify users of admin connection status
function notifyUsersOfAdminStatus(isConnected) {
  activeConnections.forEach((socketId, userKey) => {
    io.to(socketId).emit('admin status', isConnected);
  });
}
server.on('connection', (socket) => {
  console.log(
    `New connection from ${socket.remoteAddress}:${socket.remotePort} on event ${socket.event} and endpoint ${socket.nsp}`
  );
  // console.log(socket);
});

server.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${PORT}`)
);
