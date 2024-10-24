require('dotenv').config();
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import otpGenerator from 'otp-generator';
import redisClient from '../connectRedis.js';
import crypto from 'crypto';

const GLOBAL_LINK = 'http://localhost:' + process.env.PORT;
const GOOGLE_MAILER_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

const generateOtpMail = (otp) => {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">WTFChat</a>
            </div>
            <p style="font-size:1.1em">Xin chào,</p>
            <p>Cảm ơn vì đã sử dụng WTFChat. Hãy dùng mã xác thực này để hoàn thành đăng ký tài khoản. Mã xác thực sẽ tồn tại trong 5 phút.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">Trân trọng,<br />WTF Chat</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>WTFChat Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>Silicon Valley</p>
            </div>
        </div>
    </div>
    `;
};

const generateMailAuth = (token, email) => {
    return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">WTFChat</a>
            </div>
            <p style="font-size:1.1em">Xin chào,</p>
            <p>Cảm ơn vì đã sử dụng WTFChat. Hãy nhấn nút xác nhận email này là của bạn để hoàn thành đăng ký tài khoản.</p>
            <a href="${GLOBAL_LINK}/api/verify?token=${token}%26email=${email}" style="display: block; margin: 20px auto; background: #00466a; color: #fff; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 4px; width: max-content;">Xác nhận</a>
            <p style="font-size:0.9em;">Trân trọng,<br />WTF Chat</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>WTFChat Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>Silicon Valley</p>
            </div>
        </div>
    </div>
    `;
};

const sendMail = async (email) => {
    try {
        if (!email)
            return {
                EM: 'SEND_MAIL | ERROR | Không có email người nhận',
                EC: '400',
            };

        // Lấy AccessToken
        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        // Access Token sẽ nằm trong property 'token'
        const myAccessToken = myAccessTokenObject?.token;

        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken,
            },
        });

        const token = crypto.randomBytes(64).toString('hex');

        const userCallTime = await redisClient.incr(email + 'callTime');
        // if (userCallTime >= 6)
        //     return {
        //         EM: 'SEND_MAIL | ERROR | Lượt gửi mail của người dùng trong ngày đã hết',
        //         EC: '400',
        //     };
        // NX Set expiry only when the key has no expiry
        await redisClient.expire(email + 'callTime', 86400, 'NX');
        await redisClient.set(email + 'token', token);
        await redisClient.expire(email + 'token', 300);

        // mail form
        const mailOptions = {
            to: email,
            subject: 'Email này giúp chung tôi xác nhận email này là của bạn.',
            html: generateMailAuth(token, email),
        };

        // Gọi hành động gửi email
        await transport.sendMail(mailOptions);

        // Không có lỗi gì thì trả về success
        return {
            EM: 'SEND_MAIL | INFO | Gửi mail thành công',
            EC: '200',
        };
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log('SERVICE | SEND_MAIL | ERROR | ' + error);
        return {
            EM: 'SEND_MAIL | ERROR | ' + error,
            EC: '500',
        };
    }
};

// const mailVerify = async (data) => {
//     try {
//         const { token, email } = data;
//         const authToken = await redisClient.get(email + 'token');
//         console.log(authToken);

//         if (token !== authToken)
//             return {
//                 EM: 'MAIL_VERIFY | ERROR | Xác thực email thành công',
//                 EC: '400',
//             };

//         await redisClient.set(email + 'token', true);
//         console.log('a');

//         return {
//             EM: 'MAIL_VERIFY | INFO | Xác thực email thành công',
//             EC: '200',
//         };
//     } catch (error) {
//         // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
//         console.log('SERVICE | MAIL_VERIFY | ERROR | ' + error);
//         return {
//             EM: 'MAIL_VERIFY | ERROR | ' + error,
//             EC: '500',
//         };
//     }
// };

const sendOTP = async (email) => {
    try {
        if (!email)
            return {
                EM: 'SEND_OTP | ERROR | Không có email người nhận',
                EC: '400',
            };

        // Lấy AccessToken
        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        // Access Token sẽ nằm trong property 'token'
        const myAccessToken = myAccessTokenObject?.token;

        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken,
            },
        });

        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // Redis
        // đếm số lần người dùng nhận otp | nếu key chưa tồn tại hàm sẽ đặt bằng 0 rồi tăng
        const userCallTime = await redisClient.incr(email + 'Calltime');
        if (userCallTime >= 6)
            return {
                EM: 'SEND_OTP | ERROR | Lượt gửi otp của người dùng trong ngày đã hết',
                EC: '401',
            };
        // Lưu vào redis với key là email người dùng và value là otp
        // Ghi lại giá trị mới nếu key tồn tại
        await redisClient.set(email + 'OTP', otp);
        // Tự động xoá key sau 5'
        await redisClient.expire(email + 'OTP', 300);

        // mail form
        const mailOptions = {
            to: email,
            subject: otp + ' là mã xác thực của bạn.',
            html: generateOtpMail(otp),
        };

        // Gọi hành động gửi email
        await transport.sendMail(mailOptions);

        // Không có lỗi gì thì trả về success
        return {
            EM: 'SEND_OTP | INFO | Gửi mail thành công',
            EC: '200',
        };
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log('SERVICE | SEND_OTP | ERROR | ' + error);
        return {
            EM: 'SEND_OTP | ERROR | ' + error,
            EC: '500',
        };
    }
};

const otpVerifier = async (data) => {
    try {
        const { otp, email } = data;

        const authOTP = await redisClient.get(email);
        if (!authOTP)
            return {
                EM: 'SEND_MAIL | ERROR | Mã xác thực đã hêt hạn',
                EC: '400',
            };

        if (otp !== authOTP)
            return {
                EM: 'SEND_MAIL | ERROR | Mã xác thực không chính xác',
                EC: '400',
            };

        return {
            EM: 'SEND_MAIL | INFO | Mã xác thực chính xác',
            EC: '200',
        };
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
        console.log('SERVICE | SEND_MAIL | ERROR | ' + error);
        return {
            EM: 'SEND_MAIL | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const mailServices = {
    sendMail,
    sendOTP,
    otpVerifier,
};
