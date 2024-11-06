import {
    findUser,
} from "../services/FindUserService.js";

const findUserController = async (req, res) => {
    try {

        const text = req.body;
        const data = await findUser(text.text);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | FIND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};

export default findUserController;