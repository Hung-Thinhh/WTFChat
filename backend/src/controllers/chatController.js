import {
    createChat,
    getChat,
    deletaChat
} from "../services/chatService.js";
import { getIO } from "../socket/socketConfig.js";

const chatController = async (req, res) => {
    try {
        const io = getIO();
        const data = await createChat();
        io.emit('edit_comment', data.DT);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};

const getChatController = async (req, res) => {
    try {
        const data = await getChat();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const deletaChatController = async (req, res) => {
    try {
        const data = await deletaChat();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}

export {
    chatController,
    getChatController,
    deletaChatController
};