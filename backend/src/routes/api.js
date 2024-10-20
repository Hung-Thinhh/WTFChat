import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";

import {
    chatController,
    getChatController,
    deletaChatController
} from '../controllers/chatController';
import { checkAccount, handleLogin, handleLogout, handleRegister } from "../controllers/Authentication.js";
// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    // auth
    router.get("/checkaccount", checkAccount);
    router.get("/logout", handleLogout);
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);


    router.post("/chat", chatController);// api gửi tin nhắn 
    router.post("/getchat", getChatController);// api lấy tin nhắn
    router.get("/deletechat", deletaChatController);// api xoa tin nhắn


    return app.use("/api", router);
};

export default initApiRouter;
