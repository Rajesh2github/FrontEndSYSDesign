// server.js
import express from 'express';
import http  from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/Pooja', (req, res) => {
  res.sendFile(__dirname + '/user2.html');
});
app.get('/Rajesh', (req, res) => {
  res.sendFile(__dirname + '/user1.html');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for testing)
  },
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('chat-messageP', (msg) => {
    console.log('message:', msg);
    // Broadcast message to all clients except sender
    socket.broadcast.emit('chat-messageP', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('Pooja', (msg) => {
    console.log('message:', msg);
    // Broadcast message to all clients except sender
    socket.broadcast.emit('Rajesh', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('Rajesh', (msg) => {
    console.log('message:', msg);
    // Broadcast message to all clients except sender
    socket.broadcast.emit('Pooja', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
