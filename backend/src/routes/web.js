import express from 'express'
import {HomeController} from "../controllers/AdminHomeController"
import {getListUser} from "../controllers/AdminUserController"
const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", async(req, res) => {
        return res.render('index', {
            sidebar: 'rightSidebar',
            header: "header",
            data: await HomeController()
            
        });
    });
    router.get("/user", async (req, res) => {
        
        return res.render('user', {
            sidebar: 'rightSidebar',
            header: "header",
            users: await getListUser(req,res)
        });
    });


    return app.use("/", router);
}

export default initWebRouter;