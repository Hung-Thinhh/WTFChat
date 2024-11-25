import express from 'express'
import {HomeController} from "../controllers/AdminHomeController"
import {getListUser} from "../controllers/AdminUserController"
import {getListGroup} from "../controllers/AdminGroupController"
import {getReport,getReportTypeAPI} from "../controllers/AdminReportController"
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
    router.get("/group", async (req, res) => {
        
        return res.render('group', {
            sidebar: 'rightSidebar',
            header: "header",
            users: await getListGroup(req,res)
        });
    });
    router.get("/report", async (req, res) => {
        
        return res.render('report', {
            sidebar: 'rightSidebar',
            header: "header",
            reports: await getReport(req,res)
        });
    });
    router.get("/report-type", async (req, res) => {
        
        return res.render('report_type', {
            sidebar: 'rightSidebar',
            header: "header",
            report_type: await getReportTypeAPI(req,res)
        });
    });


    return app.use("/", router);
}

export default initWebRouter;