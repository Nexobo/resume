let socket;
let isConnected = false;

// Initiate WebSocket connection with the chat key
function initiateConnection() {
  const chatKey = document.getElementById('chatKey').value;
  if (!chatKey) {
    alert('Please enter a chat key.');
    return;
  }

  if (socket && socket.connected) {
    socket.disconnect(); // Ensure old connections are closed
  }

  clearChatWindow(); // Clear chat window for new session

  socket = io('http://192.168.1.4:3000', {
    query: { 'Chat-Key': chatKey },
  });

  setupSocketEventHandlers(chatKey); // Setup event handlers for WebSocket
}

// Setup WebSocket event handlers
function setupSocketEventHandlers(chatKey) {
  socket.on('connect', () => {
    console.log('Socket.IO connected');
    updateStatus(true);
    socket.emit('request history'); // Request chat history on connection
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO disconnected');
    updateStatus(false);
  });

  socket.on('chat history', (history) => {
    history.forEach((msgObj) => {
      displayMessage(msgObj); // Display each message in history
    });
  });

  socket.on('new message', (msgObj) => {
    displayMessage(msgObj); // Display incoming new messages
  });

  socket.on('admin status', (isAdminConnected) => {
    updateAdminStatus(isAdminConnected); // Update admin status
  });
}

// Send message to the server
function sendMessage() {
  if (!isConnected) {
    alert('Not connected. Please connect before sending messages.');
    return;
  }

  const message = constructMessage();
  socket.emit('chat message', message); // Emitting message to server
}

// Construct message object from input fields
function constructMessage() {
  const input = document.getElementById('input');
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;

  const message = {
    content: input.value,
    userName: userName,
    userEmail: userEmail,
  };

  input.value = ''; // Clear input field
  return message;
}

// Display a single chat message in the chat window
function displayMessage(msgObj) {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += formatMessage(msgObj);
}

// Format message for display
function formatMessage(msgObj) {
  const time = new Date(msgObj.time).toLocaleTimeString();
  return `
    <div class="message">
      <p><strong>${msgObj.userName}</strong> ${
    msgObj.userEmail ? `(${msgObj.userEmail})` : ''
  } <span>${time}</span></p>
      <p>${msgObj.content}</p>
    </div>
  `;
}

// Update connection status display
function updateStatus(connected) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = `Status: ${connected ? 'Connected' : 'Disconnected'}`;
  isConnected = connected;
}

// Update admin connection status display
function updateAdminStatus(connected) {
  const adminStatusDiv = document.getElementById('adminStatus');
  adminStatusDiv.textContent = `Admin Status: ${
    connected ? 'Connected' : 'Disconnected'
  }`;
}

// Clear chat window content
function clearChatWindow() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
}

// Disconnect from the WebSocket server
function disconnect() {
  if (socket && isConnected) {
    socket.disconnect();
    updateStatus(false);
  } else {
    alert('Not connected.');
  }
}

// Initialize WebSocket connection on page load
window.onload = () => {
  document
    .getElementById('connectBtn')
    .addEventListener('click', initiateConnection);
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document
    .getElementById('disconnectBtn')
    .addEventListener('click', disconnect);
};
