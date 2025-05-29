const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

let users = [];

io.on('connection', (socket) => {
  console.log('🔥 A user connected:', socket.id);

  socket.on('join', () => {
    users.push(socket.id);
    if (users.length > 1) {
      socket.to(users[0]).emit('ready');
    }
  });

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
    users = users.filter(id => id !== socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 HartCast server running on port ${PORT}`);
});

