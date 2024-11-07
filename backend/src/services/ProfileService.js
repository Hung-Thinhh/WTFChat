// require('dotenv').config();
import pool from '../connectDB.js';
import { google } from 'googleapis';

// const GLOBAL_LINK = 'http://localhost:' + process.env.PORT;
const GOOGLE_DRIVE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const REDIRECT_URL = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_DRIVE_CLIENT_ID,
    GOOGLE_DRIVE_CLIENT_SECRET,
    REDIRECT_URL,
);
oauth2Client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const getUserInfo = async (email) => {
    try {
        await pool.query('START TRANSACTION');

        const currUser = await pool.query(
            `SELECT xacthuc.status, nguoidung.firstname, nguoidung.lastname, nguoidung.avatar, nguoidung.birthdate, nguoidung.gender
            FROM xacthuc 
            INNER JOIN nguoidung ON xacthuc.email=nguoidung.email
            WHERE xacthuc.email = ?`,
            [email],
        );

        await pool.query('COMMIT');

        if (!currUser) {
            return {
                EM: 'GET_USER_INFO | ERROR | Lấy thông tin thất bại',
                EC: '403',
            };
        }

        return {
            EM: 'GET_USER_INFO | INFO | Lấy thông tin thành công',
            EC: '200',
            DT: currUser[0][0],
        };
    } catch (error) {
        console.log('SERVICE | GET_USER_INFO | ERROR |', error);
        return {
            EM: 'GET_USER_INFO | ERROR |' + error,
            EC: '500',
        };
    }
};

const uploadImage = async (file) => {
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: file.name,
                mimeType: file.mimeType,
            },
            media: {
                mimeType: file.mimeType,
                body: file.data,
            },
        });
        const fileId = createFile.data.id;

        // share image public
        drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        return fileId;
    } catch (error) {
        console.log('SERVICE | UPLOAD_IMAGE | ERROR |', error);
        throw new Error('UPLOAD_IMAGE | ERROR |', error);
    }
};

const updateUserInfo = async (email, data, imageID) => {
    try {
        const { username, birthdate, gender } = data;

        if (!username)
            return {
                EM: 'REGISTER | ERROR | Họ và tên không thể để trống',
                EC: '400',
            };
        else if (username.length > 100)
            return {
                EM: 'REGISTER | ERROR | Tên của bạn quá dài',
                EC: '400',
            };
        else if (!birthdate)
            return {
                EM: 'REGISTER | ERROR | Ngày sinh không thể để trống',
                EC: '400',
            };
        else if (getAge(birthdate) <= 13)
            return {
                EM: 'REGISTER | ERROR | Độ tuổi tối thiểu là 13',
                EC: '400',
            };
        else if (gender < 0 || gender > 3)
            return {
                EM: 'REGISTER | ERROR | Giới tính không tồn tại',
                EC: '400',
            };
        else {
            const firstName = username.split(' ').slice(0, -1).join(' ');
            const lastName = 'https://drive.google.com/thumbnail?id=' + imageID;
            await pool.query('START TRANSACTION');

            const currUser = await pool.query(
                `UPDATE nguoidung
                SET firstname=?, lastname=?, birthdate=?, gender=?, avatar=?
                WHERE xacthuc.email = ?`,
                [firstName, lastName, birthdate, +gender, imageURL, email],
            );

            await pool.query('COMMIT');
            console.log(currUser);

            if (!currUser) {
                return {
                    EM: 'UPDATE_USER_INFO | ERROR | Cập nhật thông tin thất bại',
                    EC: '403',
                };
            }

            return {
                EM: 'UPDATE_USER_INFO | INFO | Cập nhật thông tin thành công',
                EC: '200',
            };
        }
    } catch (error) {
        console.log('SERVICE | UPDATE_USER_INFO | ERROR |', error);
        return {
            EM: 'UPDATE_USER_INFO | ERROR |' + error,
            EC: '500',
        };
    }
};

export const profileService = {
    getUserInfo,
    uploadImage,
    updateUserInfo,
};
