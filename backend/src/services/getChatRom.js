import pool from '../connectDB.js';

const getChatRoom = async (userId) => {
    try {
        // Lấy thông tin từ bảng phongchat
        const [chatRooms] = await pool.query(
            `SELECT id, useroneid, usertwoid 
             FROM phongchat 
             WHERE useroneid = ? OR usertwoid = ?
             LIMIT 10`,
            [userId, userId]
        );

        if (chatRooms.length === 0) {
            return {
                EM: 'No chat rooms found',
                EC: 0,
                DT: []
            };
        }

        // Lấy thông tin người dùng từ bảng nguoidung
        const userIds = chatRooms.map(room => room.useroneid === userId ? room.usertwoid : room.useroneid);
        const [users] = await pool.query(
            `SELECT 
                nguoidung.firstname AS first_name,
                nguoidung.lastname AS last_name,
                nguoidung.avatar AS avt,
                nguoidung.id AS id,
                tinnhan.time AS last_message_time,
                tinnhan.content AS last_message_content,
                tinnhan.groupid AS last_message_groupid,
                tinnhan.friendid AS last_message_friendid,
                tinnhan.senderid AS last_message_senderid,
                tinnhan.id AS last_message_id
             FROM 
                nguoidung
             LEFT JOIN 
                tinnhan ON (
                    (tinnhan.senderid = nguoidung.id AND tinnhan.friendid = ?) OR 
                    (tinnhan.senderid = ? AND tinnhan.friendid = nguoidung.id)
                ) AND tinnhan.time = (
                    SELECT MAX(time) 
                    FROM tinnhan 
                    WHERE 
                        (tinnhan.senderid = nguoidung.id AND tinnhan.friendid = ?) OR 
                        (tinnhan.senderid = ? AND tinnhan.friendid = nguoidung.id)
                )
             WHERE 
                nguoidung.id IN (?)
             LIMIT 10`,
            [userId, userId, userId, userId, userIds]
        );
        return {
            EM: 'Success',
            EC: 0,
            DT: users
        };
    } catch (error) {
        console.log('SERVICE | GET CHAT ROOM SERVICE | ERROR | ', error);
        return {
            EM: 'Database query error',
            EC: -1,
            DT: []
        };
    }
};

export default getChatRoom;