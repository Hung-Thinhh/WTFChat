import pool from '../connectDB.js';
const TypeReport = async () => {
    try {
        const type = await pool.query(`SELECT * FROM report_type`);

        return {
            EM: 'get type report successfully',
            EC: 0,
            DT: type[0],
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
const SetReport = async (data) => {
    try {
        const messJson = JSON.stringify(data.mess_data);

        const [updateUser] = await pool.query(
            `INSERT baocao
            SET id_user=?, type=?, content=?`,
            [data.userId, data.report_type, messJson],
        );
        console.log(data);
        if (updateUser.affectedRows > 0) {
            return {
                EM: 'get type report successfully',
                EC: 0,
                DT: '',
            };
        } else {
            return {
                EM: 'get type report failed',
                EC: 0,
                DT: '',
            };
        }
    } catch (error) {
        console.log(error);

        return error;
    }
};
const getReport = async (page) => {
    try {
        const usersPerPage = 5;
        const currentPage = page || 1;
        const users = await pool.query(
            `SELECT u.id,u.content,u.status, u.create_at,a.content as type
            FROM baocao u JOIN report_type a ON u.type = a.id LIMIT ? OFFSET ?`,
            [usersPerPage, (currentPage - 1) * usersPerPage],
        );
        const CountReport = await pool.query('SELECT COUNT(*) FROM baocao');
        
        const totalPages = CountReport[0][0]['COUNT(*)'];

        return {
            user: users[0],
            totalPages: Math.ceil(totalPages / usersPerPage)
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
export const reportService = {
    TypeReport,
    SetReport,
    getReport
};
