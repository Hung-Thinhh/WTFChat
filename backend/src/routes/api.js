import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";

import chatController from '../controllers/chatController';
// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    //register

   
    router.get("/chat", chatController);
    return app.use("/api", router);
};

export default initApiRouter;
