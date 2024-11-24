import { createChatRoom } from "../services/chatRoomStuff";
import { verifyToken } from "../middleware/jwt.js";
import { profileService } from "../services/ProfileService.js";
const createRoomController = async (req, res) => {
    try {
        const { chatRoomName, choosedMember } = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);

        const data = await createChatRoom(userInfo.DT.id, chatRoomName, choosedMember);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | CHAT ROOM CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};


export default createRoomController;