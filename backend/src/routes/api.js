import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/jwt.js";


// const { getRating } = require("../controller/RatingController.js");


const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    //register

   

    return app.use("/api", router);
};

export default initApiRouter;
