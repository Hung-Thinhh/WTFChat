require('dotenv').config();
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import otpGenerator from 'otp-generator';

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

// Tạo API /email/send với method POST
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

        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
        });

        const mailOptions = {
            to: email,
            subject: otp + ' là mã xác thực của bạn, mã này sẽ hết hạn sau 5 phút.',
            html: generateOtpMail(otp),
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

export const mailServices = {
    sendMail,
};
