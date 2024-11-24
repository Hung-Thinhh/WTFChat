import { leaveChatRoom } from "../services/chatRoomStuff";
import { verifyToken } from "../middleware/jwt.js";
import { profileService } from "../services/ProfileService.js";
const leaveRoomController = async (req, res) => {
    try {
        const { id } = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);

        let data = await leaveChatRoom(userInfo.DT.id, id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | CHAT ROOM CONTROLLER | ERROR | ",
            EC: 500,
            DT: "",
        });
    }
};

export default leaveRoomController;