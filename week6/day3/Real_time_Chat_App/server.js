import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (data) => {
    const { username, room } = data;
    
    if (!username || !room) {
      socket.emit('error', { message: 'Username and room are required' });
      return;
    }

    socket.username = username;
    socket.room = room;
    
    socket.join(room);
    
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    
    rooms.get(room).add(username);
    users.set(socket.id, { username, room });
    
    socket.emit('joined', { 
      message: `Welcome to ${room}!`, 
      room,
      users: Array.from(rooms.get(room))
    });
    
    socket.to(room).emit('userJoined', { 
      username, 
      users: Array.from(rooms.get(room)),
      message: `${username} joined the chat`
    });
    
    console.log(`${username} joined room: ${room}`);
  });

  socket.on('message', (data) => {
    const { message } = data;
    
    if (!message || !socket.username || !socket.room) {
      return;
    }
    
    const messageData = {
      username: socket.username,
      message,
      timestamp: new Date().toLocaleTimeString(),
      room: socket.room
    };
    
    io.to(socket.room).emit('message', messageData);
    console.log(`Message in ${socket.room}: ${socket.username}: ${message}`);
  });

  socket.on('typing', () => {
    if (socket.username && socket.room) {
      socket.to(socket.room).emit('typing', { username: socket.username });
    }
  });

  socket.on('stopTyping', () => {
    if (socket.username && socket.room) {
      socket.to(socket.room).emit('stopTyping', { username: socket.username });
    }
  });

  socket.on('disconnect', () => {
    if (socket.username && socket.room) {
      const room = socket.room;
      const username = socket.username;
      
      if (rooms.has(room)) {
        rooms.get(room).delete(username);
        
        if (rooms.get(room).size === 0) {
          rooms.delete(room);
        } else {
          socket.to(room).emit('userLeft', { 
            username, 
            users: Array.from(rooms.get(room)),
            message: `${username} left the chat`
          });
        }
      }
      
      users.delete(socket.id);
      console.log(`${username} disconnected from ${room}`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
