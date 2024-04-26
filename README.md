const WebSocket = require('ws');

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for connection open
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Event listener for incoming messages
  ws.on('message', function incoming(message) {
    console.log('Received:', message);

    // Send a response back to the client
    ws.send('Hello, client! I received your message: ' + message);
  });

  // Event listener for connection close
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
