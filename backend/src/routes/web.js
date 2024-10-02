import express from 'express'

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", (req, res) => {
        return res.render('index', {
            sidebar: 'rightSidebar',
            
        });
    });

    return app.use("/", router);
}

export default initWebRouter;