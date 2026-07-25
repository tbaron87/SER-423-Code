const { WebSocketServer } = require('ws');

const port = 3001;
const server = new WebSocketServer({ port });

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('received: %s', message);

    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === 1) {
        client.send(message.toString());
      }
    });
  });
});

console.log(`Web Socket Server running on port ${port}`);
