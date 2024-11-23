import {
    findUser,
} from "../services/FindUserService.js";
import { verifyToken } from "../middleware/jwt.js";
import { profileService } from "../services/ProfileService.js";
const findUserController = async (req, res) => {
    try {

        const text = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);

        const data = await findUser(text.text, userInfo.DT.id);
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