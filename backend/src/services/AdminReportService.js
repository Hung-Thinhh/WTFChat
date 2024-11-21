import pool from '../connectDB.js';
import { getIO } from "../socket/socketConfig.js";
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
            SET id_user=?,id_mess=?, type=?, content=?`,
            [data.userId, data.id_mess, data.report_type, messJson],
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
            totalPages: Math.ceil(totalPages / usersPerPage),
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
const banReportById = async (id) => {
    try {
        const [report] = await pool.query(`SELECT * FROM baocao WHERE id=?`, [id]);
        console.log(report[0]);
        
        if (report[0]) {
            const [mess] = await pool.query(`UPDATE tinnhan SET status=? WHERE id=?`, [
                1,
                report[0].id_mess,
            ]);
            if (mess.affectedRows > 0) {
                const [updateReport] = await pool.query(`UPDATE baocao SET status=? WHERE id=?`, [
                    1,
                    id,
                ]);
                if (updateReport.affectedRows > 0) {
                    const io = getIO();
                    // io.emit('new_chat', data);
                    return {
                        EM: 'Success',
                        EC: 0,
                        DT: '',
                    };
                } else {
                    console.error('Không thể update report');
                    return {
                        EM: 'Cập nhật thất bại!',
                        EC: -1,
                        DT: '',
                    };
                }
            } else {
            console.error('Không thể update mess');

                return {
                    EM: 'Cập nhật thất bại!',
                    EC: -1,
                    DT: '',
                };
            }
        } else {
            console.error('Không thấy report');

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
const unbanReportById = async (id) => {
    try {
        const [report] = await pool.query(`SELECT * FROM baocao WHERE id=?`, [id]);
        if (report[0]) {
            const [mess] = await pool.query(`UPDATE tinnhan SET status=? WHERE id=?`, [
                0,
                report[0].id_mess,
            ]);
            if (mess.affectedRows > 0) {
                const [updateReport] = await pool.query(`UPDATE baocao SET status=? WHERE id=?`, [
                    0,
                    id,
                ]);
                if (updateReport.affectedRows > 0) {
                    return {
                        EM: 'Success',
                        EC: 0,
                        DT: '',
                    };
                } else {
                    console.error('Không thể update report');

                    return {
                        EM: 'Cập nhật thất bại!',
                        EC: -1,
                        DT: '',
                    };
                }
            } else {
                console.error('Không thấy mess');

                return {
                    EM: 'Cập nhật thất bại!',
                    EC: -1,
                    DT: '',
                };
            }
        } else {
            console.error('Không thấy report');
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
export const reportService = {
    TypeReport,
    SetReport,
    getReport,
    banReportById,
    unbanReportById,
};
