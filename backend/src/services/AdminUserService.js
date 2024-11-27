import pool from '../connectDB.js';
import { getIO } from '../socket/socketConfig.js';
import redisClient from '../connectRedis.js';
const getUsers = async (page) => {
    try {
        const usersPerPage = 5;
        const currentPage = page || 1;
        const users = await pool.query(
            `SELECT u.firstname,u.lastname,u.avatar, a.time,a.status, a.role, a.id  
            FROM nguoidung u JOIN xacthuc a ON u.id = a.id LIMIT ? OFFSET ?`,
            [usersPerPage, (currentPage - 1) * usersPerPage],
        );
        const CountUser = await pool.query('SELECT COUNT(*) FROM nguoidung');

        const totalPages = CountUser[0][0]['COUNT(*)'];
        const listStatus = await redisClient.get('online_users');
        users[0].forEach(user => {
            const foundStatus = JSON.parse(listStatus).find(status => status.userId === user.id && status.status === 'online');
            user.checkin = foundStatus ? 0 : 1; // Nếu tìm thấy trạng thái "online", checkin = 0, ngược lại checkin = 1
          });
          
        return {
            user: users[0],
            totalPages: Math.ceil(totalPages / usersPerPage),
            listStatus:listStatus
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
const getUserByID = async (id) => {
    try {
        const users = await pool.query(
            `SELECT u.*, a.status,a.role,a.time  FROM nguoidung u JOIN xacthuc a ON u.id=a.id WHERE u.id= ${id}`,
        );
        return {
            EM: 'Success',
            EC: 0,
            DT: users[0],
        };
    } catch (error) {
        console.log(error);

        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const editUserById = async (data) => {
    try {
        const [users] = await pool.query(
            `UPDATE nguoidung SET firstname=?, lastname=?, birthdate=?, gender=? WHERE id=?`,
            [data.firstName, data.lastName, data.birthday, data.gender, data.id],
        );

        // Sử dụng then() trên Promise được trả về bởi pool.query()
        // Kiểm tra kết quả của câu lệnh UPDATE
        if (users.affectedRows > 0) {
            console.log('Cập nhật thành công!');
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
// status mặc định = 1
const banUserById = async (id) => {
    try {
        const [users] = await pool.query(`UPDATE xacthuc SET status=? WHERE id=?`, [0, id]);

        // Sử dụng then() trên Promise được trả về bởi pool.query()
        // Kiểm tra kết quả của câu lệnh UPDATE
        if (users.affectedRows > 0) {
            console.log('Cập nhật thành công!');
            const io = getIO();
            io.emit('ban_user', { id });
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
const unbanUserById = async (id) => {
    try {
        const [users] = await pool.query(`UPDATE xacthuc SET status=? WHERE id=?`, [1, id]);

        // Sử dụng then() trên Promise được trả về bởi pool.query()
        // Kiểm tra kết quả của câu lệnh UPDATE
        if (users.affectedRows > 0) {
            console.log('Cập nhật thành công!');
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
    getUsers,
    getUserByID,
    editUserById,
    banUserById,
    unbanUserById,
};
