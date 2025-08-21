const socket = io();

let currentUser = '';
let currentRoom = '';
let typingTimeout;

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const leaveBtn = document.getElementById('leave-btn');
const usersList = document.getElementById('users-list');
const roomName = document.getElementById('room-name');
const userCount = document.getElementById('user-count');
const typingIndicator = document.getElementById('typing-indicator');
const typingText = document.getElementById('typing-text');
const charCount = document.getElementById('char-count');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const room = roomInput.value.trim();
    
    if (username && room) {
        currentUser = username;
        currentRoom = room;
        
        socket.emit('join', { username, room });
        
        loginContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        
        roomName.textContent = room;
        messageInput.focus();
    }
});

leaveBtn.addEventListener('click', () => {
    socket.emit('disconnect');
    resetChat();
});

messageInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    charCount.textContent = `${length}/500`;
    
    if (length > 0) {
        sendBtn.disabled = false;
        socket.emit('typing');
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit('stopTyping');
        }, 1000);
    } else {
        sendBtn.disabled = true;
        socket.emit('stopTyping');
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && currentUser && currentRoom) {
        socket.emit('message', { message });
        messageInput.value = '';
        charCount.textContent = '0/500';
        sendBtn.disabled = true;
        socket.emit('stopTyping');
    }
}

function resetChat() {
    currentUser = '';
    currentRoom = '';
    messagesContainer.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-hand-wave"></i>
            <p>Welcome to the chat! Start typing to begin...</p>
        </div>
    `;
    usersList.innerHTML = '';
    userCount.textContent = '0 users online';
    typingIndicator.style.display = 'none';
    messageInput.value = '';
    charCount.textContent = '0/500';
    sendBtn.disabled = true;
    
    chatContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    usernameInput.focus();
}

function addMessage(data, type = 'other') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageHeader = document.createElement('div');
    messageHeader.className = 'message-header';
    messageHeader.innerHTML = `
        <span class="username">${data.username}</span>
        <span class="timestamp">${data.timestamp}</span>
    `;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = data.message;
    
    messageDiv.appendChild(messageHeader);
    messageDiv.appendChild(messageContent);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addSystemMessage(message) {
    const systemDiv = document.createElement('div');
    systemDiv.className = 'system-message';
    systemDiv.textContent = message;
    
    messagesContainer.appendChild(systemDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function updateUsersList(users) {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        usersList.appendChild(li);
    });
    
    userCount.textContent = `${users.length} user${users.length !== 1 ? 's' : ''} online`;
}

function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

socket.on('joined', (data) => {
    addSystemMessage(data.message);
    updateUsersList(data.users);
    showNotification(`Welcome to ${data.room}!`);
});

socket.on('userJoined', (data) => {
    addSystemMessage(data.message);
    updateUsersList(data.users);
    showNotification(`${data.username} joined the chat`);
});

socket.on('userLeft', (data) => {
    addSystemMessage(data.message);
    updateUsersList(data.users);
    showNotification(`${data.username} left the chat`);
});

socket.on('message', (data) => {
    const isOwnMessage = data.username === currentUser;
    addMessage(data, isOwnMessage ? 'own' : 'other');
    
    if (!isOwnMessage) {
        showNotification(`New message from ${data.username}`);
    }
});

socket.on('typing', (data) => {
    if (data.username !== currentUser) {
        typingText.textContent = `${data.username} is typing...`;
        typingIndicator.style.display = 'flex';
    }
});

socket.on('stopTyping', (data) => {
    if (data.username !== currentUser) {
        typingIndicator.style.display = 'none';
    }
});

socket.on('error', (data) => {
    showNotification(`Error: ${data.message}`);
});

socket.on('disconnect', () => {
    showNotification('Disconnected from server');
    resetChat();
});

document.addEventListener('DOMContentLoaded', () => {
    usernameInput.focus();
    sendBtn.disabled = true;
});
