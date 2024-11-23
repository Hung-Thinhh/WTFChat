import { getChatRoom } from "../services/getChatRom.js";

const getRoomController = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await getChatRoom(id);
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


export default getRoomController;