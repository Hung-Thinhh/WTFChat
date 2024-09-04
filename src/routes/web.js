import express from 'express'

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", (req, res) => {
        return res.send('Naruto')
    });

    return app.use("/", router);
}

export default initWebRouter;