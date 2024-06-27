import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const connectedUsers = []

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log('connected on', socket.id);
  
    socket.on('register', (userId) => {
      socket.userId = userId;

      connectedUsers.push(socket)
    });
  
    socket.on('chat', (message) => {
      const { sender, receiver, content } = message;
  
      const receiverSocket = connectedUsers.find(socket => socket.userId === receiver);

      if (receiverSocket) {
        io.to(receiverSocket.id).emit('chat', { sender, content, receiver });
        io.to(socket.id).emit('chat', { sender, content, receiver });
      } else {
        console.log(`User ${receiver} is not connected`);

        io.to(socket.id).emit('chat', { sender, content: `User ${receiver} is offline.` });
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
    
});