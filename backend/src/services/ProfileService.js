// require('dotenv').config();
import pool from '../connectDB.js';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const GLOBAL_LINK = 'http://localhost:' + process.env.PORT;
const GOOGLE_DRIVE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
// const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_DRIVE_CLIENT_ID,
    GOOGLE_DRIVE_CLIENT_SECRET,
    GLOBAL_LINK,
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
            EM: 'GET_USER_INFO | ERROR |',
            error,
            EC: '500',
        };
    }
};

const uploadImage = async (data) => {
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: '',
                mimeType: '',
            },
            media: {
                mimeType: '',
                body: fs.createReadStream(path.join(__dirname, '/../cr7.jpg')),
            },
        });
        const fileId = createFile.data.id;
        console.log(createFile.data);
        const getUrl = await that.setFilePublic(fileId);

        console.log(getUrl.data);
    } catch (error) {
        console.error(error);
    }
};

export const profileService = {
    getUserInfo,
};
