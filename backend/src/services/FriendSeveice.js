
import { stat } from 'fs/promises';
import pool from '../connectDB.js';

export const getFriendList = async (userId) => {
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
                WHERE (useroneid = ? OR usertwoid = ?) AND block = 0
            ) AS friends ON nguoidung.id = friends.friendId
            WHERE NOT EXISTS (
                SELECT 1 FROM banbe 
                WHERE (useroneid = nguoidung.id OR usertwoid = nguoidung.id) AND block = 1
            )`,
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

        // Check if the friend relationship already exists
        const [existingFriendRows] = await pool.query(
            "SELECT * FROM `banbe` WHERE (useroneid = ? AND usertwoid = ?) OR (useroneid = ? AND usertwoid = ?)",
            [userId, friendId, friendId, userId]
        );

        if (existingFriendRows.length > 0) {
            if (status === false) {
                // Update the block status if the relationship exists
                const [delRows] = await pool.query(
                    "DELETE FROM `banbe` WHERE usertwoid = ? OR useroneid = ?",
                    [friendId, friendId]
                );
                if (delRows.affectedRows === 0) {
                    return {
                        EM: 'Error updating block status',
                        EC: 0,
                        DT: []
                    };
                }
            } else {
                // Update the block status if the relationship exists
                const [updateRows] = await pool.query(
                    "UPDATE `banbe` SET block = ? WHERE (useroneid = ? AND usertwoid = ?) OR (useroneid = ? AND usertwoid = ?)",
                    [status, userId, friendId, friendId, userId]
                );

                if (updateRows.affectedRows === 0) {
                    return {
                        EM: 'Error updating block status',
                        EC: 0,
                        DT: []
                    };
                }
            }
        } else {
            // Insert a new friend relationship if it does not exist
            const [insertRows] = await pool.query(
                "INSERT INTO `banbe`(`useroneid`, `usertwoid`, `block`) VALUES (?,?, ?)",
                [userId, friendId, status]
            );

            if (insertRows.affectedRows === 0) {
                return {
                    EM: 'Error inserting new friend relationship',
                    EC: 0,
                    DT: []
                };
            }
        }



        await pool.query('COMMIT');

        return {
            EM: 'Friends block successfully',
            EC: 1,
            DT: existingFriendRows
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | BLOCK FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};

export const getblockFriendList = async (userId) => {
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
                WHERE useroneid = ?
            ) AS friends ON nguoidung.id = friends.friendId
            WHERE EXISTS (
                SELECT 1 FROM banbe 
                WHERE (useroneid = nguoidung.id OR usertwoid = nguoidung.id) AND block = 1
            )`,
            [userId, userId]
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

    } catch (error) {
        console.log('SERVICE | GET FRIEND SERVICE | ERROR | ', error);
        throw error
    }
};


