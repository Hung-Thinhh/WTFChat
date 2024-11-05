import { profileService } from "../services/ProfileService";

export const getUserInfo = async (req, res) => {
    try {
        const account = await profileService.getUserInfo(req.user.email);

        // do all in middleware check 
        if (!req.user.email || !account) {
            console.log('CONTROLER | CHECKACCOUNT | ERROR | Xác thực thất bại');
            return res.status(200).json({
                EM: 'CHECKACCOUNT | INFO | Xác thực thất bại',
                EC: '403',
            });
        }

        if (account.DT.status === 0)
            return res.status(200).json({
                EM: 'CHECKACCOUNT | INFO | Tài khoản đang bị khoá',
                EC: '400',
            });

        return res.status(200).json({
            EM: 'CHECKACCOUNT | INFO | Xác thực thành công',
            EC: '200',
            DT: {
                email: req.user.email,
                ...account.DT
            },
        });
    } catch (error) {
        console.log('CONTROLER | CHECKACCOUNT | ERROR | ' + error);
        return res.status(200).json({
            EM: 'CHECKACCOUNT | INFO | ' + error,
            EC: '500',
        });
    }
};

