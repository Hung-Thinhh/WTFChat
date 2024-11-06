import pool from '../connectDB.js';

const findUser = async (text) => {
    try {
        const [result] = await pool.query(
            `SELECT 'Nhom' AS loai, n.id, n.groupname, n.avatar, n.membernum
            FROM nhom n
            WHERE n.groupname LIKE ?
            LIMIT 15`, ['%' + text + '%']);

        const [result2] = await pool.query(
            `SELECT 'Người dùng' AS loai, id, firstname, lastname, avatar
            FROM nguoidung 
            WHERE firstname || ' ' || lastname LIKE ?
            LIMIT 15`, ['%' + text + '%']);

        if (result.length > 0 || result2.length > 0) {
            return {
                EM: 'SERVICE | FIND USER SERVICE | SUCCESS | ',
                EC: 0,
                DT: [...result, ...result2]
            };
        } else {
            return {
                EM: 'No results found',
                EC: 1,
                DT: []
            };
        }
    } catch (error) {
        console.log('SERVICE | FIND USER SERVICE | ERROR | ', error);
        return {
            EM: error.message,
            EC: -1,
            DT: []
        };
    }
};

module.exports = {
    findUser,
};