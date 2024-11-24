import pool from '../connectDB.js';
const findUser = async (text, id) => {
    try {
        //search người dùng
        const [result2] = await pool.query(
            `SELECT DISTINCT 'nguoidung' AS loai, id, firstname, lastname, avatar
            FROM nguoidung 
            WHERE (firstname LIKE ? OR lastname LIKE ? OR id LIKE ?) AND id != ?
            LIMIT 15`, ['%' + text + '%', '%' + text + '%', '%' + text + '%', id]);



        const [friends] = await pool.query(
            `SELECT DISTINCT CASE 
            WHEN useroneid = ? THEN usertwoid 
            ELSE useroneid 
            END as friendId, MAX(block) as block 
            FROM banbe 
            WHERE useroneid = ? OR usertwoid = ? 
            GROUP BY friendId`, [id, id, id]);
        console.log(friends);


        result2.forEach(user => {
            const friend = friends.find(friend => friend.friendId === user.id);
            console.log(friend);
            
            user.isFriend = !!friend;
            user.isBlock = friend ? friend.block === 1 : false;
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