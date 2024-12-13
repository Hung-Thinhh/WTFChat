import pool from '../connectDB.js';

export const createChatRoom = async (userid, name, choosedMember) => {
    try {
        await pool.query('START TRANSACTION');

        // Thêm phòng chat
        const [chatRoomResult] = await pool.query(
            "INSERT INTO `phongchat`(`groupName`, `avt`, `type`, `update_time`) VALUES (?,?,?,?)",
            [name, null, 1, new Date()]
        );

        const chatRoomId = chatRoomResult.insertId;

        // Thêm các thành viên vào phòng chat
        const ids = [...choosedMember, { id: userid }].map((member) => member.id);
        for (const member of ids) {
            await pool.query(
                "INSERT INTO `thanhvien`(`userid`, `idRoom`, `role`, `notify`) VALUES (?,?,?,?)",
                [member, chatRoomId, userid == member ? 1 : 0, 1]
            );
        }

        await pool.query('COMMIT');

        return {
            EM: 'Chat room and members added successfully',
            EC: 1,
            DT: {
                id: chatRoomId,
                groupName: name,
                avt: null,
                type: 'group',
                update_time: new Date(),
                otherUserId: ids,
                last_message: null
            }
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | CREATE CHAT ROOM SERVICE | ERROR | ', error);
        throw error
    }
};

export const createPrivateChatRoom = async (userid, otherUserId) => {
    try {
        await pool.query('START TRANSACTION');
        // Kiểm tra xem phòng chat đã tồn tại chưa
        const [existingChatRoom] = await pool.query(
            "SELECT id FROM `phongchat` WHERE `type` = 0 AND id IN (SELECT `idRoom` FROM `thanhvien` WHERE `userid` = ? OR `userid` = ? GROUP BY `idRoom` HAVING COUNT(*) = 2)",
            [userid, otherUserId]
        );

        if (existingChatRoom && existingChatRoom.length > 0) {
            await pool.query('ROLLBACK');
            return {
                EM: 'Private chat room already exists',
                EC: 1,
                DT: existingChatRoom[0].id
            };
        }
        // Thêm phòng chat
        const [chatRoomResult] = await pool.query(
            "INSERT INTO `phongchat`(`groupName`, `avt`, `type`, `update_time`) VALUES (?,?,?,?)",
            [otherUserId, null, 0, new Date()]
        );

        const chatRoomId = chatRoomResult.insertId;

        // Thêm các thành viên vào phòng chat
        const ids = [otherUserId, userid];
        for (const member of ids) {
            await pool.query(
                "INSERT INTO `thanhvien`(`userid`, `idRoom`, `role`, `notify`) VALUES (?,?,?,?)",
                [member, chatRoomId, 0, 1]
            );
        }

        await pool.query('COMMIT');

        return {
            EM: 'Chat room and members added successfully',
            EC: 1,
            DT: {
                id: otherUserId,
                groupName: otherUserId,
                avt: null,
                type: 'private',
                update_time: new Date(),
                otherUserId: ids,
                last_message: null
            }
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | CREATE CHAT ROOM SERVICE | ERROR | ', error);
        throw error
    }
};

export const leaveChatRoom = async (idUser, grId) => {
    try {
        await pool.query('START TRANSACTION');
        console.log(grId, idUser);

        // Kiểm tra số lượng thành viên trong phòng chat
        const [members] = await pool.query(
            "SELECT `userid` FROM `thanhvien` WHERE `idRoom` = ?",
            [grId]
        );
        console.log(members);

        if (members.length === 2) {
            // Xóa cả phòng chat, tin nhắn và các thành viên
            await pool.query(
                "DELETE FROM `tinnhan` WHERE `idRoom` = ?",
                [grId]
            );
            await pool.query(
                "DELETE FROM `thanhvien` WHERE `idRoom` = ?",
                [grId]
            );
            await pool.query(
                "DELETE FROM `phongchat` WHERE `id` = ?",
                [grId]
            );

        } else {
            // Chỉ xóa thành viên có idUser
            await pool.query(
                "DELETE FROM `thanhvien` WHERE `idRoom` = ? AND `userid` = ?",
                [grId, idUser]
            );
        }

        await pool.query('COMMIT');

        return {
            EM: 'Left chat room successfully',
            EC: 1,
            DT: null
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | LEAVE CHAT ROOM SERVICE | ERROR | ', error);
        throw error;
    }
};


export const updateInfoGr = async ({ avt, name, id }) => {
    try {
        await pool.query('START TRANSACTION');
        if (avt) {
            await pool.query(
                "UPDATE `phongchat` SET `avt` = ? WHERE `id` = ?",
                [avt, id]
            );
        }
        if (name) {
            await pool.query(
                "UPDATE `phongchat` SET `groupName` = ? WHERE `id` = ?",
                [name, id]
            );
        }
        await pool.query('COMMIT');

        return {
            EM: 'Group info updated successfully',
            EC: 1,
            DT: {
                id: id,
                groupName: name,
                avt: avt,
                update_time: new Date()
            }
        };

    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('SERVICE | LEAVE CHAT ROOM SERVICE | ERROR | ', error);
        throw error;
    }
};
