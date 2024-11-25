import { updateInfoGr } from "../services/chatRoomStuff";
import { profileService } from "../services/ProfileService.js";
export const changeRoomAvtController = async (req, res) => {
    try {
        console.log('CONTROLLER | UPDATE_USER_INFO | req.body:', req.file);
        const { id } = req.body;
        const driveUpload = req.file && (await profileService.uploadImage(req.file));
        const data = await updateInfoGr({ avt: driveUpload, name: null, id: id });
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

export const changeRoomNameController = async (req, res) => {
    try {
        const { name, id } = req.body;
        const data = await updateInfoGr({ avt: null, name: name, id: id });
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
