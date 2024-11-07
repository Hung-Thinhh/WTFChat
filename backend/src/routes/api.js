import express from 'express';
import { checkUserJWT, checkUserPermission } from '../middleware/jwt.js';
import {
    chatController,
    getChatController,
    deletaChatController,
} from '../controllers/chatController';
import { getFriendController } from '../controllers/getFriendController.js';

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
import { getUserInfo, updateUserInfo } from '../controllers/ProfileController.js';
import multer from 'multer';

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        },
    }),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type. Only PNG, JPG, and JPEG files are allowed.'));
        }
    },
});

const initApiRouter = (app) => {
    router.all('*', checkUserJWT);

    // authen
    router.get('/checkaccount', checkAccount);
    router.get('/getPublicKey', getPublicKey);
    router.get('/logout', handleLogout);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);
    router.post('/sendOTP', sendOTP);
    router.post('/searchMail', seachMail);
    router.post('/changePass', handleChangePass);

    // profile
    router.get('/getUserInfo', getUserInfo);
    router.post('/updateUserInfo', upload.single('avatar'), updateUserInfo);

    // chat
    router.post('/chat', chatController); // api gửi tin nhắn
    router.post('/getchat', getChatController); // api lấy tin nhắn

    // friend
    router.post('/friendList', getFriendController); // api lấy tin nhắn

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
