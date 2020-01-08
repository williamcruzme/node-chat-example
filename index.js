'use strict';

const morgan = require('morgan');
const redisAdapter = require('socket.io-redis');
const statusMonitor = require('express-status-monitor');

// Initialize Express.js
const app = require('express')();
const server = require('http').createServer(app);

app.use(morgan('dev'));
app.use(statusMonitor());

// Initialize Socket.IO
const io = require('socket.io')(server, {
  path: process.env.WEBSOCKET_PATH || '/chat',
});

io.adapter(redisAdapter({
  host: process.env.REDIS_SERVICE_HOST || 'localhost',
  port: 6379,
}));

// Configure Socket.IO events
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Expose server
server.listen(3001, () => {
  console.log('Listening on *:3001');
});

module.exports = server;
