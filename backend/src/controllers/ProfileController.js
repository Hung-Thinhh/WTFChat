import { profileService } from '../services/ProfileService';

export const getUserInfo = async (req, res) => {
    try {
        const account = await profileService.getUserInfo(req.user.email);
        // middleware
        if (!req.user.email || !account) {
            return res.status(200).json({
                EM: 'GET_USER_INFO | INFO | Xác thực thất bại',
                EC: '403',
            });
        }

        if (account.DT.status === 0)
            return res.status(200).json({
                EM: 'GET_USER_INFO | INFO | Tài khoản đang bị khoá',
                EC: '400',
            });
        // middleware

        return res.status(200).json({
            EM: 'GET_USER_INFO | INFO | Xác thực thành công',
            EC: '200',
            DT: {
                email: req.user.email,
                ...account.DT,
            },
        });
    } catch (error) {
        console.log('CONTROLER | GET_USER_INFO | ERROR | ' + error);
        return res.status(200).json({
            EM: 'GET_USER_INFO | INFO | ' + error,
            EC: '500',
        });
    }
};

export const updateUserInfo = async (req, res) => {
    try {

        const driveUpload = req.file && (await profileService.uploadImage(req.file));

        const data = await req.body;
        const email = await req.user.email;

        const result = await profileService.updateUserInfo(email, data, driveUpload);

        return res.status(200).json(result);
    } catch (error) {
        console.log('CONTROLLER | UPDATE_USER_INFO | ERROR | ', error);

        return res.status(200).json({
            EM: 'UPDATE_USER_INFO | ERROR | ' + error,
            EC: '500',
        });
    }
};
