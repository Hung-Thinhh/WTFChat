import { Server } from "socket.io";
let io;

import {
  createChat,
} from "../services/chatService.js";
import { handleCheckAccount } from "../services/AuthenService.js";
const setupWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    // Place event handlers here
    require('./event/chat')(io, socket);
    // xác thực người dùng
    socket.on('authenticate', async (id) => {
      try {
        const user = id;
        if (user) {
          socket.userId = user;
        } else {
          console.log('SOCKET | ERROR | Xác thực thất bại cho websocket không có id');
          socket.disconnect();
        }
      } catch (error) {
        console.log('SOCKET | ERROR | Xác thực thất bại cho websocket:', error);
        socket.disconnect();
      }
    });
    // Tham gia phòng chat
    socket.on('join_room', (room) => {
      socket.join(room);
    });

    // Rời phòng chat
    socket.on('leave_room', (room) => {
      socket.leave(room);
    });

    // Xử lý sự kiện gửi tin nhắn
    socket.on('send_mess', async (data) => {
      try {
        const chat = await createChat(data.senderid, data.roomid, data.content, data.time);
        io.to(data.room).emit('new_chat', chat.DT[0]); // Phát sự kiện tới phòng cụ thể
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    });

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
