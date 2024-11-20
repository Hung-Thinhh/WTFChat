import { Server } from 'socket.io';
let io;

import { createChat } from '../services/chatService.js';
import { deletaChat } from '../services/chatService.js';
// import { handleCheckAccount } from '../services/AuthenService.js';
import redisClient from '../connectRedis.js';
import path from 'path';
import fs from 'fs';
const setupWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
        maxHttpBufferSize: 1e8, // Increase buffer size to 100MB
    });
    io.on('connection', (socket) => {
        // Place event handlers here
        require('./event/chat')(io, socket);
        // console.log('Người dùng đã kết nối:', socket.id);

        // xác thực người dùng
        socket.on('authenticate', async (id) => {
            try {
                const user = id;

                if (user) {
                    socket.userId = user;
                    //lấy danh sách status_users
                    const resdis_online_users = await redisClient.get('online_users');
                    const online_users = JSON.parse(resdis_online_users);

                    // check if user not in list
                    if (!online_users.some((userObj) => userObj.userId === user)) {
                        //nếu chưa thì thêm vào
                        online_users.push({ userId: user, time: Date.now(), status: 'online' });
                        await redisClient.set('online_users', JSON.stringify(online_users));
                        // console.log(online_users);
                    } else {
                        //nếu r thì sửa trạng thái thành on
                        const userIndex = online_users.findIndex(
                            (userObj) => userObj.userId === user,
                        );
                        if (userIndex !== -1) {
                            online_users[userIndex] = {
                                userId: user,
                                time: Date.now(),
                                status: 'online',
                            };
                            //lưu vào redis
                            await redisClient.set('online_users', JSON.stringify(online_users));
                            // console.log(online_users);
                        }
                    }
                    io.emit('user_status_update', JSON.parse(await redisClient.get('online_users')));
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

                let fileInfo = null;
                if (data.image) {
                    const buffer = Buffer.from(data.image, 'base64');
                    const fileName = `${Date.now()}.png`; // Hoặc sử dụng phần mở rộng phù hợp với loại tệp
                    const filePath = path.join(__dirname, '/../../uploads', fileName);

                    // Lưu trữ tệp hình ảnh
                    await fs.promises.writeFile(filePath, buffer);

                    // Tạo đối tượng chứa thông tin chi tiết về tệp
                    fileInfo = {
                        fieldname: 'image',
                        originalname: fileName,
                        encoding: '7bit',
                        mimetype: 'image/png',
                        destination: 'uploads/',
                        filename: fileName,
                        path: filePath,
                        size: buffer.length
                    };
                }
                const chat = await createChat(data.senderid, data.roomid, data.content, data.time, fileInfo, data.traloi);
                io.to(data.roomid).emit('new_chat', chat.DT); // Phát sự kiện tới phòng cụ thể
            } catch (error) {
                console.error('Error creating chat:', error);
            }
        });


        socket.on('delete_mess', async (data) => {
            try {
                const delete_mess = await deletaChat(data.id);
                delete_mess.id = data.id;
                io.to(data.roomid).emit('delete_res', {delete_mess}); // Phát sự kiện tới phòng cụ thể
            } catch (error) {
                console.error('Error creating chat:', error);
            }
        });

        socket.on('disconnect', async () => {
            const resdis_online_users = await redisClient.get('online_users');
            const online_users = JSON.parse(resdis_online_users);
            const user = socket.userId;
            if (!online_users.some((userObj) => userObj.userId === user)) {
                online_users.push({ userId: user, time: Date.now(), status: 'offline' });
                await redisClient.set('online_users', JSON.stringify(online_users));
                // console.log(online_users);
                // console.log('không có');

            } else {
                const userIndex = online_users.findIndex((userObj) => userObj.userId === user);
                if (userIndex !== -1) {
                    online_users[userIndex] = {
                        userId: user,
                        time: Date.now(),
                        status: 'offline',
                    };
                    await redisClient.set('online_users', JSON.stringify(online_users));
                    // console.log(online_users);
                    // console.log('có');

                }
            }
            // gửi lên cliend
            io.emit('user_status_update', JSON.parse(await redisClient.get('online_users')));

            // console.log('Người dùng đã ngắt kết nối:', socket.id);
        });
    });
};
const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = { setupWebSocket, getIO };
