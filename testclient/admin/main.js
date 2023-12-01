let socket;
let selectedChatKey = null;

// Initialize WebSocket connection for admin
function initiateConnection() {
  const adminKey = 'adminSpecialKey'; // Admin key for authentication

  socket = io('http://localhost:3000', {
    query: { 'Chat-Key': adminKey, 'Is-Admin': 'true' },
  });

  // Set up WebSocket event handlers
  setupSocketEventHandlers();
}

// Set up WebSocket event handlers
function setupSocketEventHandlers() {
  socket.on('connect', () => handleAdminConnect());
  socket.on('disconnect', () => handleAdminDisconnect());
  socket.on('active chats', (chats) => updateChatList(chats));
  socket.on('chat history', (history) => updateChatHistory(history));
  socket.on('new message', (msgObj, chatKey) =>
    handleNewMessage(msgObj, chatKey)
  );
  socket.on('new_connection', (chatKey) => requestActiveChats());
  socket.on('connection_ended', (chatKey) => handleConnectionEnded(chatKey));
}
// Handle connection ended event
function handleConnectionEnded(chatKey) {
  if (selectedChatKey === chatKey) {
    selectedChatKey = null;
    clearChatWindow();
  }
  requestActiveChats();
}

//update chat history
function updateChatHistory(history) {
  console.log(history);
  history.forEach((msgObj) => {
    displayMessage(msgObj);
  });
}

// Handle admin connection
function handleAdminConnect() {
  console.log('Admin connected');
  //update admin
  requestActiveChats();
}

// Handle admin disconnection
function handleAdminDisconnect() {
  console.log('Admin disconnected');
  clearChatList();
}

// Request list of active chats
function requestActiveChats() {
  socket.emit('request active chats');
}

// Update list of active chats
function updateChatList(chats) {
  const chatList = document.getElementById('chatList');
  chatList.innerHTML = '';
  chatList.append(
    ...chats.map((chatKey) => {
      const li = document.createElement('li');
      li.dataset.chatKey = chatKey;
      li.onclick = () => selectChat(chatKey);
      li.innerText = `Chat: ${chatKey}`;
      return li;
    })
  );
}

// Handle new message event
function handleNewMessage(msgObj, chatKey) {
  if (selectedChatKey === chatKey) {
    displayMessage(msgObj);
  }
}

// Select a chat to interact with
function selectChat(chatKey) {
  selectedChatKey = chatKey;
  console.log(`Selected chat: ${chatKey}`);
  clearChatWindow();
  requestChatHistory(chatKey);
  // Highlight the selected chat
  const chatListItems = document.querySelectorAll('#chatList li');
  console.log(chatListItems);
  chatListItems.forEach((li) => {
    console.log(li);
    li.classList.remove('selected');
    if (li.dataset.chatKey === chatKey) {
      li.classList.add('selected');
    }
  });
}

// Request chat history for a selected chat
function requestChatHistory(chatKey) {
  socket.emit('request history', chatKey);
}

// Send message as admin
function sendAdminMessage() {
  if (!selectedChatKey) {
    alert('Please select a chat first.');
    return;
  }

  const messageContent = document.getElementById('input').value;
  document.getElementById('input').value = '';

  const message = { content: messageContent, userName: 'Admin' };
  socket.emit('admin message', message, selectedChatKey);
}

// Display a single chat message
function displayMessage(msgObj) {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML += formatMessage(msgObj);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}

// Format message for display
function formatMessage(msgObj) {
  const time = new Date(msgObj.time).toLocaleTimeString();
  return `<div class="message">
            <p><strong>${msgObj.userName}</strong>: ${msgObj.content} <span>${time}</span></p>
          </div>`;
}

// Clear chat list
function clearChatList() {
  document.getElementById('chatList').innerHTML = '';
}

// Clear chat window
function clearChatWindow() {
  document.getElementById('messages').innerHTML = '';
}

// Initiate connection when the page loads
window.onload = initiateConnection;
