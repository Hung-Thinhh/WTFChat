import { createChatRoom, createPrivateChatRoom } from "../services/chatRoomStuff";
import { verifyToken } from "../middleware/jwt.js";
import { profileService } from "../services/ProfileService.js";
const createRoomController = async (req, res) => {
    try {
        const { chatRoomName, choosedMember, type } = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);
        let data = {};
        if (choosedMember.length === 0) {
            return res.status(400).json({
                EM: "SERVICE | CHAT ROOM CONTROLLER | ERROR | Chưa chọn thành viên",
                EC: 0,
                DT: "",
            });
        }
        if (type === "private")
            data = await createPrivateChatRoom(userInfo.DT.id, choosedMember[0]);
        else {
            if (!chatRoomName) {
                return res.status(400).json({
                    EM: "SERVICE | CHAT ROOM CONTROLLER | ERROR | Tên phòng chat không được để trống",
                    EC: 0,
                    DT: "",
                });
            }
            data = await createChatRoom(userInfo.DT.id, chatRoomName, choosedMember);
        }
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


export default createRoomController;