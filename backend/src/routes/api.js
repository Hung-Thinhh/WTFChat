import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";

import {
    chatController,
    getChatController,
    deletaChatController
} from '../controllers/chatController';
import { handleRegister } from "../controllers/Authentication.js";
// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    //register
    router.get("/register", handleRegister);


    router.get("/chat", chatController);
    router.get("/getchat", getChatController);
    router.get("/deletechat", deletaChatController);


    return app.use("/api", router);
};

export default initApiRouter;
