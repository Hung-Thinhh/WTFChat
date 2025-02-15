import {
    addFriend,
    blockFriend,
    delFriend,
    getblockFriendList,
    getFriendList,
} from "../services/FriendSeveice.js";
import { verifyToken } from "../middleware/jwt.js";
import { profileService } from "../services/ProfileService.js";

export const getFriendController = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await getFriendList(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | GET FRIEND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};

export const getBlockFriendController = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await getblockFriendList(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "SERVICE | GET FRIEND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};


export const addFriendController = async (req, res) => {
    try {

        const { friendId } = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);

        const data = await addFriend(userInfo.DT.id, friendId);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            EM: "SERVICE | ADD FRIEND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};

export const delFriendController = async (req, res) => {
    try {

        const { friendId } = req.body;

        const data = await delFriend(friendId);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            EM: "SERVICE | DELETE FRIEND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};

export const blockFriendController = async (req, res) => {
    try {
        const { friendId, status } = req.body;
        const userInfo = await profileService.getUserInfo(verifyToken(req.session.userId).email);

        const data = await blockFriend(userInfo.DT.id, friendId, status);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            EM: "SERVICE | BLOCK FRIEND CONTROLLER | ERROR | ",
            EC: error,
            DT: "",
        });
    }
};
