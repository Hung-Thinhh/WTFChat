import pool from '../connectDB.js';

const getChatRoom = async (id) => {
    try {
        const [rows] = await pool.query(
            `SELECT
            p.id,
            CASE
                WHEN p.type = 0 THEN otherUser.name
                ELSE p.groupName
            END AS groupName,
            CASE
                WHEN p.type = 0 THEN otherUser.avatar
                ELSE p.avt
            END AS avt,
            p.type,
            p.update_time,
            p.status,
            (
                SELECT GROUP_CONCAT(u.id)
                FROM thanhvien tv
                JOIN nguoidung u ON tv.userid = u.id
                WHERE tv.idRoom = p.id AND u.id != ?
            ) AS otherUserId,
            (
                SELECT 
                JSON_OBJECT(
                    'content', t.content,
                    'idUser', u.id,
                    'sender', CONCAT(u2.firstname, ' ', u2.lastname)
                )
                FROM tinnhan t
                JOIN thanhvien tv2 ON t.idThanhvien = tv2.id
                JOIN nguoidung u ON tv2.userid = u.id
                JOIN nguoidung u2 ON tv2.userid = u2.id
                WHERE t.idRoom = p.id AND t.status = 0
                ORDER BY t.time DESC
                LIMIT 1
            ) AS last_message
            FROM phongchat p
            JOIN thanhvien tv ON p.id = tv.idRoom
            LEFT JOIN (
            SELECT tv.idRoom, CONCAT(u.firstname, ' ', u.lastname) AS name, u.avatar AS avatar, u.id AS id
            FROM thanhvien tv
            JOIN nguoidung u ON tv.userid = u.id
            WHERE tv.userid != ?
            ) AS otherUser ON p.id = otherUser.idRoom
            WHERE tv.userid = ?
            GROUP BY p.id, p.groupName, p.avt, p.update_time
            ORDER BY p.update_time DESC;
            `,
            [id, id, id],
        );
        console.log('SERVICE | GET CHAT ROOM SERVICE | SUCCESS | ', rows)
        return {
            EM: 'Success',
            EC: 1,
            DT: rows.map((row) => {
                row.type = row.type === 1 ? "group" : "private";
                row.otherUserId = row.otherUserId.split(',');
                return { ...row };
            }),
        };
    } catch (error) {
        console.log('SERVICE | GET CHAT ROOM SERVICE | ERROR | ', error);
        return {
            EM: 'Database query error',
            EC: -1,
            DT: [],
        };
    }
};
const mute = async (id, state, idRoom) => {
    try {
        const [re] = await pool.query(`UPDATE thanhvien SET notify = ? WHERE userid = ? AND idRoom = ?`, [state, id, idRoom]);
        
        if (re.affectedRows === 0) {
            return {
                EM: 'No rows updated',
                EC: 0,
                DT: []
            };
        }
        
        const [updatedRow] = await pool.query(`SELECT  notify, idRoom as idroom FROM thanhvien WHERE userid = ? AND idRoom = ?`, [id, idRoom]);
        return {
            EM: 'Success',
            EC: 0,
            DT: updatedRow
        };
    } catch (error) {
        console.log('SERVICE | MUTE CHAT SERVICE | ERROR | ', error);
        return {
            EM: 'Database query error',
            EC: -1,
            DT: []
        };
    }
};
module.exports = {
    getChatRoom,
    mute
};
