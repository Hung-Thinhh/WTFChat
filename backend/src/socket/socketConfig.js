import { Server } from "socket.io";
let io;

import {
  createChat,
} from "../services/chatService.js";
const setupWebSocket = (server) => {
     io = new Server(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ["GET","POST"]
        }
      });
    io.on('connection', (socket) => {
      console.log('Một người dùng đã kết nối:', socket.id);
  
      // Place event handlers here
      require('./event/chat')(io, socket);
      socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối:', socket.id);
      });
    });
  };
  const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}
  
module.exports = { setupWebSocket, getIO };
