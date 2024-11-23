
import pool from '../connectDB.js';

export const getFriendList = async (userId, friendId) => {
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

        return {
            EM: 'Friends retrieved successfully',
            EC: 1,
            DT: friendRows
        };


        // console.log('SERVICE | GET FRIEND SERVICE | ROOM ROWS | ', roomRows);
        // if (roomRows.length === 0) {
        //     return {
        //         EM: 'No room found',
        //         EC: 0,
        //         DT: []
        //     };
        // }
    } catch (error) {
        console.log('SERVICE | GET FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};

export const addFriend = async (userId, friendId) => {
    try {
        await pool.query('START TRANSACTION');

        // Lấy ID phòng chat giữa hai người dùng
        const [friendRows] = await pool.query(
            "INSERT INTO `banbe`(`useroneid`, `usertwoid`) VALUES (?,?)",
            [userId, friendId]
        );

        if (friendRows.affectedRows === 0) {
            return {
                EM: 'have error',
                EC: 0,
                DT: []
            };
        }
        await pool.query('COMMIT');

        return {
            EM: 'Friends add successfully',
            EC: 1,
            DT: friendRows
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | ADD FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};

export const delFriend = async (friendId) => {
    try {
        await pool.query('START TRANSACTION');

        // Xóa bạn bè giữa hai người dùng
        const [friendRows] = await pool.query(
            "DELETE FROM `banbe` WHERE usertwoid = ? OR useroneid = ?",
            [friendId, friendId]
        );
        console.log(friendRows);

        if (friendRows.affectedRows === 0) {
            return {
                EM: 'have error',
                EC: 0,
                DT: []
            };
        }
        await pool.query('COMMIT');

        return {
            EM: 'Friends del successfully',
            EC: 1,
            DT: friendRows
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | DEL FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};

export const blockFriend = async (userId, friendId, status) => {
    try {
        await pool.query('START TRANSACTION');

        // Lấy ID phòng chat giữa hai người dùng
        const [friendRows] = await pool.query(
            "INSERT INTO `banbe`(`useroneid`, `usertwoid`, `block`) VALUES (?,?, ?) ON DUPLICATE KEY UPDATE `block` = ?",
            [userId, friendId, status, status]
        );

        if (friendRows.affectedRows === 0) {
            return {
                EM: 'have error',
                EC: 0,
                DT: []
            };
        }
        await pool.query('COMMIT');

        return {
            EM: 'Friends block successfully',
            EC: 1,
            DT: friendRows
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | BLOCK FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};

export const notifyFriend = async (userId, friendId, status) => {
    try {
        await pool.query('START TRANSACTION');

        // Lấy ID phòng chat giữa hai người dùng
        const [friendRows] = await pool.query(
            "INSERT INTO `banbe`(`useroneid`, `usertwoid`, `notify`) VALUES (?,?, ?) ON DUPLICATE KEY UPDATE `notify` = ?",
            [userId, friendId, status, status]
        );

        if (friendRows.affectedRows === 0) {
            return {
                EM: 'have error',
                EC: 0,
                DT: []
            };
        }
        
        await pool.query('COMMIT');

        return {
            EM: 'Friends notify change successfully',
            EC: 1,
            DT: friendRows
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | NOTIFY FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};
