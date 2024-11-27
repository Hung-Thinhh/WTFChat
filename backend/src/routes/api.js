import express from 'express';
import { checkUserJWT, checkUserPermission } from '../middleware/jwt.js';
import {
    chatController,
    getChatController,
    deletaChatController,
    getNotifyController
} from '../controllers/chatController';
import {
    getFriendController, addFriendController, delFriendController,
    blockFriendController, getBlockFriendController
} from '../controllers/FriendController.js';
import {
    getReportType, sendReport, getReportAPI,
    banReportById, unbanReportById, editReportType,
    addReportType,banReportType,unbanReportType,getReportByIdUser,getReportByIdGroup
} from "../controllers/AdminReportController.js";
import { getRoomController,muteCtrl } from '../controllers/getChatRoomCtrl.js';
import GetInfoRoom from '../controllers/GetInfoRoom.js';
import createRoomController from '../controllers/CreateRoomController.js';
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
import {
    getListGroupAPI,
    banGroupById,
    unbanGroupById,
} from '../controllers/AdminGroupController.js';
import { getUserInfo, updateUserInfo } from '../controllers/ProfileController.js';
import multer from 'multer';
import leaveRoomController from '../controllers/LeaveRoomController.js';
import { changeRoomAvtController, changeRoomNameController } from '../controllers/changeRoomInfoController.js';


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
    router.post('/getroominfo', GetInfoRoom); // api lấy tin nhắn
    router.post('/mute', muteCtrl); // api lấy tin nhắn
    router.post('/getnotify', getNotifyController); // api lấy tin nhắn

    // friend
    router.post('/friendList', getFriendController); // api lấy tin nhắn
    router.post('/addFriend', addFriendController); // api lấy tin nhắn
    router.post('/delFriend', delFriendController); // api lấy tin nhắn
    router.post('/blockFriend', blockFriendController); // api lấy tin nhắn
    router.post('/getBlockFriendList', getBlockFriendController); // api lấy tin nhắn

    router.post('/deletechat', deletaChatController); // api xoa tin nhắn
    router.post('/getchatroom', getRoomController); // api lấy phòng chat
    router.post('/createroom', createRoomController); // api tạo phòng chat
    router.post('/finduser', findUserController); // api tìm người dùng
    router.post('/leaveroom', leaveRoomController); // api tìm người dùng
    router.post('/changeAvtGr', upload.single('avatar'), changeRoomAvtController); // api tìm người dùng
    router.post('/changeNameGr', changeRoomNameController); // api tìm người dùng


    //report 
    router.get('/getReportType', getReportType);
    router.post('/sendReport', sendReport);
    router.get('/banReportById/:id', banReportById);
    router.get('/unbanReportById/:id', unbanReportById);
    router.get('/banReportType/:id', banReportType);
    router.get('/unbanReportType/:id', unbanReportType);
    router.post('/edit-reportType', editReportType);
    router.post('/add-reportType', addReportType);
    router.get('/getReportByIdUser/:id', getReportByIdUser);
    router.get('/getReportByIdGroup/:id', getReportByIdGroup);
    router.get('/getReport/:page', getReportAPI);

    //admin
    router.get('/getUserById/:id', getUserById);
    router.get('/banUserById/:id', banUserById);
    router.get('/unbanUserById/:id', unbanUserById);
    router.get('/getUser/:page', getListUserAPI);
    router.post('/edit-user', editUser);

    router.get('/getGroupById/:id', getListGroupAPI);
    router.get('/banGroupById/:id', banGroupById);
    router.get('/unbanGroupById/:id', unbanGroupById);

    return app.use('/api', router);
};

export default initApiRouter;
