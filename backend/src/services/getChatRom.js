import pool from '../connectDB.js';

const getChatRoom = async (id) => {
    try {
        const [row] = await pool.query(
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
                banbe
            JOIN 
                nguoidung ON banbe.usertwoid = nguoidung.id OR banbe.useroneid = nguoidung.id
            LEFT JOIN 
                tinnhan ON (
                    (tinnhan.senderid = banbe.useroneid AND tinnhan.friendid = banbe.usertwoid) OR 
                    (tinnhan.senderid = banbe.usertwoid AND tinnhan.friendid = banbe.useroneid)
                ) AND tinnhan.time = (
                    SELECT MAX(time) 
                    FROM tinnhan 
                    WHERE 
                        (tinnhan.senderid = banbe.useroneid AND tinnhan.friendid = banbe.usertwoid) OR 
                        (tinnhan.senderid = banbe.usertwoid AND tinnhan.friendid = banbe.useroneid)
                )
            WHERE 
                (banbe.useroneid = ? OR banbe.usertwoid = ?)
            AND nguoidung.id != ?;`,
            [id, id, id]
        );
        return {
            EM: 'Success',
            EC: 1,
            DT: row
        };
    } catch (error) {
        console.log('SERVICE | CHAT SERVICE | ERROR | ', error); // dAev only
        return {
            EM: 'Database query error',
            EC: -1,
            DT: []
        };
    }
};
module.exports = {
    getChatRoom
};