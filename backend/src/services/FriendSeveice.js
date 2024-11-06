
import pool from '../connectDB.js';

const getFriendList = async (userId, friendId) => {
    try {
        // Lấy ID phòng chat giữa hai người dùng
        const [friendRows] = await pool.query(
            `SELECT nguoidung.id, nguoidung.avatar, nguoidung.firstname, nguoidung.lastname 
            FROM nguoidung 
            JOIN (
                SELECT DISTINCT CASE 
                    WHEN useroneid = ? THEN usertwoid 
                    ELSE useroneid 
                END as friendId 
                FROM banbe 
                WHERE useroneid = ? OR usertwoid = ?
            ) AS friends ON nguoidung.id = friends.friendId`,
            [userId, userId, userId]
        );

        if (friendRows.length === 0) {
            return {
                EM: 'No friends found',
                EC: 0,
                DT: []
            };
        }

        console.log('SERVICE | GET FRIEND SERVICE | FRIEND ROWS | ', friendRows);
        return {
            EM: 'Friends retrieved successfully',
            EC: 1,
            DT: friendRows
        };

        
        console.log('SERVICE | GET FRIEND SERVICE | ROOM ROWS | ', roomRows);
        if (roomRows.length === 0) {
            return {
                EM: 'No room found',
                EC: 0,
                DT: []
            };
        }
    } catch (error) {
        console.log('SERVICE | GET FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};


export { getFriendList }