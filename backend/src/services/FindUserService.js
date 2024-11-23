import pool from '../connectDB.js';
const findUser = async (text, id) => {
    try {
        //search tin nhắn và gr chat
        // const [result] = await pool.query(
        //     `SELECT 'Nhom' AS loai, n.id, n.groupname, n.avatar, n.membernum
        //     FROM nhom 
        //     WHERE n.groupname LIKE ?
        //     LIMIT 15`, ['%' + text + '%']);

        //search người dùng
        const [result2] = await pool.query(
            `SELECT DISTINCT 'nguoidung' AS loai, id, firstname, lastname, avatar
            FROM nguoidung 
            WHERE (firstname LIKE ? OR lastname LIKE ? OR id LIKE ?) AND id != ?
            LIMIT 15`, ['%' + text + '%', '%' + text + '%', '%' + text + '%', id]);

        // const userId = /* get user id from session */;

        
        const userIds = result2.map(user => user.id)

        const [friends] = await pool.query(
            `SELECT DISTINCT CASE 
            WHEN useroneid = ? THEN usertwoid 
            ELSE useroneid 
            END as friendId 
            FROM banbe 
            WHERE useroneid = ? OR usertwoid = ?`, [id, id, id]);
        console.log(friends);

        const friendIds = friends.map(friend => friend.friendId);

        result2.forEach(user => {
            user.isFriend = friendIds.includes(user.id);
        });

        if (result2.length > 0) {
            return {
                EM: 'SERVICE | FIND USER SERVICE | SUCCESS | ',
                EC: 0,
                DT: [...result2]
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