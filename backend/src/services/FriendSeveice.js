
import pool from '../connectDB.js';

const getFriendList = async (userId, friendId) => {
    try {
        // Lấy ID phòng chat giữa hai người dùng
        const [roomRows] = await pool.query(
            `SELECT DISTINCT * FROM banbe WHERE useroneid = ? OR usertwoid = ?`,
            [userId,userId]
        );
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