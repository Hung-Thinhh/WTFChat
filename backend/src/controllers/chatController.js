import {
    createChat,
    getChat,
    deletaChat
} from "../services/chatService.js";
import { getIO } from "../socket/socketConfig.js";

const chatController = async (req, res) => {
    try {
        const senderid = req.body.senderid;
        const friendid = req.body.friendid;
        const groupid = req.body.groupid;
        const content = req.body.content;
        const time = req.body.time;
        const numlike = req.body.numlike;
        const io = getIO();
        const data = await createChat(senderid, friendid, groupid, content, time, numlike);
        io.emit('new_chat', data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | CHAT CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};

const getChatController = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const data = await getChat(userId, friendId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | CHAT CONTROLLER | ERROR | ",
            EC: error,
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
            EM: "SERVICE | CHAT CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
}
const createRoomController = async (req, res) => {
    try {
      const { userOneId, userTwoId } = req.body;
      const data = await createRoom(userOneId, userTwoId);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log('CONTROLLER | CREATE ROOM CONTROLLER | ERROR | ', error);
      return res.status(500).json({
        EM: 'Internal server error',
        EC: -1,
        DT: [],
      });
    }
  };

export {
    chatController,
    getChatController,
    deletaChatController,
    createRoomController
};