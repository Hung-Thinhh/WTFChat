import express from 'express';
import { checkUserJWT, checkUserPermission } from '../middleware/jwt.js';

import {
    chatController,
    getChatController,
    deletaChatController,
} from '../controllers/chatController';

import { getRoomController } from '../controllers/getChatRoomCtrl.js';
import {
    checkAccount,
    getPublicKey,
    handleChangePass,
    handleLogin,
    handleLogout,
    handleRegister,
    seachMail,
    sendOTP,
} from '../controllers/AuthenController.js';
import findUserController from '../controllers/FindUserController.js';
import {
    getUserById,
    editUser,
    getListUserAPI,
    banUserById,
    unbanUserById,
} from '../controllers/AdminUserController.js';

const router = express.Router();

const initApiRouter = (app) => {
    router.all('*', checkUserJWT);

    router.get('/checkaccount', checkAccount);
    router.get('/getPublicKey', getPublicKey);
    router.get('/logout', handleLogout);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);
    router.post('/sendOTP', sendOTP);
    router.post('/searchMail', seachMail);
    router.post('/changePass', handleChangePass);

    router.post('/chat', chatController); // api gửi tin nhắn
    router.post('/getchat', getChatController); // api lấy tin nhắn
    router.get('/deletechat', deletaChatController); // api xoa tin nhắn
    router.post('/getchatroom', getRoomController); // api lấy phòng chat
    router.post('/createroom', getRoomController); // api tạo phòng chat
    router.post('/finduser', findUserController); // api tìm người dùng

    //admin
    router.get('/getUserById/:id', getUserById);
    router.get('/banUserById/:id', banUserById);
    router.get('/unbanUserById/:id', unbanUserById);
    router.get('/getUser/:page', getListUserAPI);
    router.post('/edit-user', editUser);

    return app.use('/api', router);
};

export default initApiRouter;
