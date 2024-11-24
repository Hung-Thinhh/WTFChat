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
                [member, chatRoomId, 1, 1]
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

        // Thêm phòng chat
        const [chatRoomResult] = await pool.query(
            "INSERT INTO `phongchat`(`groupName`, `avt`, `type`, `update_time`) VALUES (?,?,?,?)",
            [name, null, 1, new Date()]
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
                id: chatRoomId,
                groupName: name,
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