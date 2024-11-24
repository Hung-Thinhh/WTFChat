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
        for (const member of [...choosedMember, { id: userid }]) {
            await pool.query(
                "INSERT INTO `thanhvien`(`userid`, `idRoom`, `role`, `notify`) VALUES (?,?,?,?)",
                [member.id, chatRoomId, 1, 1]
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
                update_time: new Date(),
                otherUserId: null,
                last_message: null
            }
        };

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log('SERVICE | CREATE CHAT ROOM SERVICE | ERROR | ', error);
        throw error
    }
};
