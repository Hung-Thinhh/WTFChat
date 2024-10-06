import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";

import {
    chatController,
    getChatController,
    deletaChatController
} from '../controllers/chatController';
import { checkAccount, handleLogin, handleRegister } from "../controllers/Authentication.js";
// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    router.get("/checkaccount", checkAccount);

    //register
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);


    router.post("/chat", chatController);
    router.get("/getchat", getChatController);
    router.get("/deletechat", deletaChatController);


    return app.use("/api", router);
};

export default initApiRouter;
