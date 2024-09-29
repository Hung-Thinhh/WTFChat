import express from 'express'

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", (req, res) => {
        return res.render('index', { title: 'cặt', message: 'Hello there!' })
    });

    return app.use("/", router);
}

export default initWebRouter;