import pool from '../connectDB.js';
import { getIO } from '../socket/socketConfig.js';
const getGroups = async (page) => {
    try {
        const usersPerPage = 5;
        const currentPage = page || 1;
        const users = await pool.query(
            `SELECT p.id, p.groupName,p.createdAt, COUNT(tv.id) AS total_members,
            n.firstname,n.lastname,n.avatar, p.createdAt, p.status
            FROM phongchat p
            LEFT JOIN thanhvien tv ON p.id = tv.idRoom
            LEFT JOIN nguoidung n ON tv.userid = n.id
            WHERE p.type = 1 AND tv.role = 1
            GROUP BY p.id, p.groupName LIMIT ? OFFSET ?`,
            [usersPerPage, (currentPage - 1) * usersPerPage],
        );
        const CountUser = await pool.query('SELECT COUNT(*) FROM phongchat  WHERE phongchat.type = 1');

        const totalPages = CountUser[0][0]['COUNT(*)'];
        console.log(users[0]);
        
          
        return {
            user: users[0],
            totalPages: Math.ceil(totalPages / usersPerPage),
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
// status mặc định = 0
const banGroupById = async (id) => {
    try {
        const [users] = await pool.query(`UPDATE phongchat SET status=? WHERE id=?`, [1, id]);

        // Sử dụng then() trên Promise được trả về bởi pool.query()
        // Kiểm tra kết quả của câu lệnh UPDATE
        if (users.affectedRows > 0) {
            console.log('Cập nhật thành công!');
            const io = getIO();
            io.emit('ban_group', { id ,isBan: true });
            return {
                EM: 'Success',
                EC: 0,
                DT: '',
            };
        } else {
            console.log('Cập nhật thất bại!');
            return {
                EM: 'Cập nhật thất bại!',
                EC: -1,
                DT: '',
            };
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const unbanGroupById = async (id) => {
    try {
        const [users] = await pool.query(`UPDATE phongchat SET status=? WHERE id=?`, [0, id]);

        // Sử dụng then() trên Promise được trả về bởi pool.query()
        // Kiểm tra kết quả của câu lệnh UPDATE
        if (users.affectedRows > 0) {
            console.log('Cập nhật thành công!');
            const io = getIO();
            io.emit('ban_group', { id ,isBan: false });
            return {
                EM: 'Success',
                EC: 0,
                DT: '',
            };
        } else {
            console.log('Cập nhật thất bại!');
            return {
                EM: 'Cập nhật thất bại!',
                EC: -1,
                DT: '',
            };
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
export const adminUser = {
    getGroups,
    banGroupById,
    unbanGroupById,
};
