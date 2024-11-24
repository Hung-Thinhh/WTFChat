import { createChatRoom } from "../services/chatRoomStuff";

const createRoomController = async (req, res) => {
    try {
        const { chatRoomName, choosedMember } = req.body;
        const data = await createChatRoom(chatRoomName, choosedMember);
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