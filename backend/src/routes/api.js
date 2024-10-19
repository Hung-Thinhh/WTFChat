import express from 'express';
import { checkUserJWT, checkUserPermission } from '../middleware/jwt.js';

import {
    chatController,
    getChatController,
    deletaChatController,
} from '../controllers/chatController';
import {
    checkAccount,
    getPublicKey,
    handleLogin,
    handleLogout,
    handleRegister,
    sendMail,
} from '../controllers/AuthenController.js';
// const { getRating } = require("../controller/RatingController.js");

const router = express.Router();

const initApiRouter = (app) => {
    router.all('*', checkUserJWT);

    // auth
    router.get('/checkaccount', checkAccount);
    router.get('/getPublicKey', getPublicKey);
    router.get('/logout', handleLogout);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);
    router.post('/sendmail', sendMail);


    // chat
    router.post('/chat', chatController);
    router.get('/getchat', getChatController);
    router.get('/deletechat', deletaChatController);

    return app.use('/api', router);
};

export default initApiRouter;
