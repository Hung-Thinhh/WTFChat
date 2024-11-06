// require('dotenv').config();
import pool from '../connectDB.js';


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

export const profileService = {
    getUserInfo,
};
