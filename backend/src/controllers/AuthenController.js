require('dotenv').config();
import { services } from '../services/AuthenService.js';
import { mailServices } from '../services/MailService.js';
import Otp_service from '../services/Otp_services.js';

export const getPublicKey = async (req, res) => {
    return res.status(200).json({
        EM: 'PUBLICKEY | INFO | Get publickey success',
        EC: '200',
        DT: process.env.PUBLIC_KEY,
    });
};

export const handleRegister = async (req, res) => {
    try {
        const data = await req.body;

        const result = await services.handleRegister(data);

        return res.status(200).json({
            ...result,
            DT: '',
        });
    } catch (error) {
        return res.status(200).json({
            EM: 'CONTROLLER | REGISTER | ERROR | ' + error,
            EC: '500',
        });
    }
};

export const handleLogin = async (req, res) => {
    try {
        const data = await req.body;

        const result = await services.handleLogin(data);

        if (result.DT) {
            if (data.remember) {
                res.cookie('jwt', result.DT.access_token, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
            } else {
                res.cookie('jwt', result.DT.access_token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
            }
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log('CONTROLLER | LOGIN | ERROR | ', error);

        return res.status(200).json({
            EM: 'LOGIN | ERROR | ' + error,
            EC: '500',
        });
    }
};

export const handleLoginGG = async (req, res) => {
    try {
        let check = await Authentication_service.handleAuthGG(req.body.id);
        if (check) {
            res.cookie('jwt', check.DT.access_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                EM: check.EM,
                EC: check.EC,
                DT: check.DT,
            });
        }
    } catch (error) {
        console.log('error: >>>>', error);

        return res.status(200).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
};

export const handleLogout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            EM: 'LOGOUT | INFO | Đăng xuất thành công',
            EC: '200',
        });
    } catch (error) {
        console.log('CONTROLLER | LOGOUT | ERROR | ' + error);

        return res.status(200).json({
            EM: 'LOGOUT | ERROR | ' + error,
            EC: '500',
        });
    }
};

export const checkAccount = async (req, res) => {
    try {
        const account = await services.handleCheckAccount(req.user.email);

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
                access_token: req.token,
                email: req.user.email,
                username: account.DT.lastname,
                avt: account.DT.avatar,
                friends: account.DT.friends,
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

export const sendMail = async (req, res) => {
    try {
        const email = await req.body.email;

        const result = await mailServices.sendMail(email);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json({
            EM: 'CONTROLLER | SEND_MAIL | ERROR | ' + error,
            EC: '500',
        });
    }
};

export const handleForgotPassword = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(500).json({
                EM: 'Email rỗng!',
                EC: '-1',
                DT: '',
            });
        }
        let check = await Otp_service.CreateOtp(req.body.email);
        if (check) {
            res.cookie('userIdentifier', `${check.DT}`, {
                maxAge: 900000,
                httpOnly: true,
            });
            return res.status(200).json({
                EM: check.EM,
                EC: check.EC,
                DT: {},
            });
        }
    } catch (error) {
        console.log('error: >>>>', error);

        return res.status(200).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
};

export const RequestOTP = async (req, res) => {
    try {
        const id = req.cookies.userIdentifier;
        let check = await Otp_service.CreateOtp(id);
        if (check) {
            res.cookie('userIdentifier', `${check.DT}`, {
                maxAge: 900000,
                httpOnly: true,
            });
            return res.status(200).json({
                EM: check.EM,
                EC: check.EC,
                DT: {},
            });
        }
    } catch (error) {
        console.log('error: >>>>', error);

        return res.status(200).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
};

export const handleVerifyOtp = async (req, res) => {
    try {
        if (!req.body.otp) {
            return res.status(500).json({
                EM: 'OTP rỗng!',
                EC: '-1',
                DT: '',
            });
        }
        const id = req.cookies.userIdentifier;
        let check = await Otp_service.VerifyOtp(id, req.body.otp);
        if (check) {
            return res.status(200).json({
                EM: check.EM,
                EC: check.EC,
                DT: check.DT,
            });
        }
    } catch (error) {
        console.log('error: >>>>', error);

        return res.status(200).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
};

// module.exports = {
//   handleRegister,
//   handleLogin,
//   handleLogingg,
//   handleLogout,
//   checkAccount,
//   handleForgotPassword,handleVerifyOtp,RequestOTP
// };
