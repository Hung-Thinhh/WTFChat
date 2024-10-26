import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";

import {
    chatController,
    getChatController,
    deletaChatController
} from '../controllers/chatController';
import { handleRegister } from "../controllers/Authentication.js";
import {getUserById,editUser,getListUserAPI} from "../controllers/AdminUserController.js"
// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    //register
    router.post("/register", handleRegister);


    router.get("/chat", chatController);
    router.get("/getchat", getChatController);
    router.get("/deletechat", deletaChatController);

    //admin
    router.get("/getUserById/:id", getUserById);
    router.get("/getUser/:page", getListUserAPI);
    router.post("/edit-user", editUser);


    return app.use("/api", router);
};

export default initApiRouter;
