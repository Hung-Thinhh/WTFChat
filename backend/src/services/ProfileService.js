// require('dotenv').config();
import pool from '../connectDB.js';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { getAge } from '../lib/globalFunct.js';

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
            `SELECT xacthuc.status, nguoidung.firstname, nguoidung.lastname, nguoidung.id,nguoidung.avatar, nguoidung.birthdate, nguoidung.gender
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
                name: file.filename,
                mimeType: file.mimeType,
            },
            media: {
                mimeType: file.mimeType,
                body: fs.createReadStream(path.join(__dirname, '/../../uploads', file.filename)),
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

        // Remove the temporary file
        fs.unlink(file.path, (err) => {
            if (err) {
                console.log('SERVICE | UPLOAD_IMAGE | ERROR | ', err);
            }
        });

        return fileId;
    } catch (error) {
        console.error('SERVICE | UPLOAD_IMAGE | ERROR |', error);
    }
};

const extractFileId = (link) => {
    if (!link) {
        return '';
    }
    // Define the regular expression
    const regex = /id=(\w+)/;

    // Match the regex against the link
    const match = link.match(regex);

    // Extract the file ID from the match
    const fileId = match[1];

    return fileId;
};

const deleteDriveImage = async (fileId) => {
    try {
        console.log('Delete File:::', fileId);
        const deleteFile = await drive.files.delete({
            fileId: fileId,
        });
        console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
        console.error('SERVICE | DELETE_IMAGE | ERROR |', error);
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
            await pool.query('START TRANSACTION');
            // get user to get avatar id and compare prev data
            const currUser = await pool.query(
                `SELECT firstname, lastname, birthdate, gender, avatar
                FROM nguoidung 
                WHERE email = ?`,
                [email],
            );
            const firstName = username.split(' ').slice(0, -1).join(' ');
            const lastName = username.split(' ').slice(-1).join(' ');

            if (
                currUser[0][0].firstName === firstName &&
                currUser[0][0].lastName === lastName &&
                currUser[0][0].birthdate === birthdate &&
                currUser[0][0].gender === gender &&
                currUser[0][0].avatar === avatar
            ) {
                return {
                    EM: 'UPDATE_USER_INFO | ERROR | Không có thay đổi được thực hiện',
                    EC: '400',
                };
            }

            let updateUser; // để lưu trữ kết quả cập nhật
            if (imageID) {
                // delete old file
                const oldFileId = extractFileId(currUser[0][0].avatar);
                deleteDriveImage(oldFileId);

                const imageURL = 'https://drive.google.com/thumbnail?id=' + imageID;

                updateUser = await pool.query(
                    `UPDATE nguoidung
                    SET firstname=?, lastname=?, birthdate=?, gender=?, avatar=?
                    WHERE email = ?`,
                    [firstName, lastName, birthdate, +gender, imageURL, email],
                );
            } else {
                updateUser = await pool.query(
                    `UPDATE nguoidung
                    SET firstname=?, lastname=?, birthdate=?, gender=?
                    WHERE email = ?`,
                    [firstName, lastName, birthdate, +gender, email],
                );
            }

            await pool.query('COMMIT');

            if (!updateUser) {
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
        await pool.query('ROLLBACK');
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
