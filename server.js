import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { redis } from "./lib/redis.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const connectedUsers = new Map() // using a map to store the connected user sockets

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: ["https://aries-three.vercel.app"],
      methods: ["GET", "POST"]
    }
    }
);
  

  io.on("connection", (socket) => {
  
    socket.on('register', (userId) => {
      socket.userId = userId;

      connectedUsers.set(userId, socket)

      io.emit('status', 'Online');
    });
  
    socket.on('chat', async(data) => {
      const { sender, receiver, content } = data;
  
      const receiverSocket = connectedUsers.get(receiver)

      const message = {
        sender,
        receiver,
        content,
        createdAt: new Date().toISOString()
      }
      // const message = await prisma.message.create({
      //   data: {
      //     senderId: sender,
      //     receiverId: receiver,
      //     message: content
      //   }
      // })
      
      if (receiverSocket) {
        io.to(receiverSocket.id).emit('chat', data);
        io.to(socket.id).emit('chat', data);
        
        await redis.lpush(`messages:${sender}:${receiver}`, JSON.stringify(message));
        await redis.lpush(`messages:${receiver}:${sender}`, JSON.stringify(message));
        
      } else {
        io.emit('status', 'Offline');
      }
      socket.on('disconnect', () => {
        if (socket.userId) {
          connectedUsers.delete(socket.userId)
  
          io.emit('status', 'Offline');
        }
      });
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