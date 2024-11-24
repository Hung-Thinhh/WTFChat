import pool from '../connectDB.js';
import { getIO } from '../socket/socketConfig.js';
const TypeReport = async () => {
    try {
        const type = await pool.query(`SELECT * FROM report_type WHERE status =0`);

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
const TypeReportAPI = async (page) => {
    try {
        const type = await pool.query(`SELECT * FROM report_type`);

        return {
            type: type[0],
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
                    const [messInfor] = await pool.query(`SELECT * FROM tinnhan WHERE id=?`, [
                        report[0].id_mess,
                    ]);
                    const io = getIO();
                    console.log(messInfor[0]);
                    const delete_mess = messInfor[0];
                    io.to(messInfor[0].idRoom).emit('delete_res', { delete_mess });
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
                    const [messInfor] = await pool.query(
                        `SELECT
                        t.id,
                        t.content,
                        t.time,
                        t.image,
                        t.traloi,
                        t.idRoom,
                        CONCAT(u.firstname, ' ', u.lastname) AS senderName,u.id AS senderid,
                        u.avatar AS avt
                        FROM tinnhan t
                        JOIN thanhvien tv ON t.idThanhvien = tv.id
                        JOIN nguoidung u ON tv.userid = u.id
                        WHERE t.id=?`,
                        [report[0].id_mess],
                    );
                    const io = getIO();
                    console.log(messInfor[0]);
                    const delete_mess = messInfor[0];
                    io.to(messInfor[0].idRoom).emit('return_res', { delete_mess });
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
const banReportType = async (id) => {
    try {
        const [updateReport] = await pool.query(`UPDATE report_type SET status=? WHERE id=?`, [1, id]);
        if (updateReport.affectedRows > 0) {
            const [report_type] = await pool.query(`SELECT * FROM report_type WHERE status= 0 `);
            const io = getIO();
            console.log(report_type);
            const report = report_type;
            io.emit('delete_report_type', { report });
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
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const unbanReportType = async (id) => {
    try {
        const [updateReport] = await pool.query(`UPDATE report_type SET status=? WHERE id=?`, [0, id]);
        if (updateReport.affectedRows > 0) {
            const [report_type] = await pool.query(`SELECT * FROM report_type WHERE status= 0`);
            const io = getIO();
            console.log(report_type);
            const report = report_type;
            io.emit('delete_report_type', { report });
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
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const editReportType = async (data) => {
    try {
        const [updateReportType] = await pool.query(
            `UPDATE report_type SET content=?, infor=? WHERE id=?`,
            [data.content, data.infor, data.id],
        );
        console.log(data);
        if (updateReportType.affectedRows > 0) {
            const [report_type] = await pool.query(`SELECT * FROM report_type WHERE status= 0 `);
            const io = getIO();
            console.log(report_type);
            const report = report_type;
            io.emit('delete_report_type', { report });
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
const addReportType = async (data) => {
    try {
        const [updateReportType] = await pool.query(
            `INSERT INTO report_type(content,infor) VALUES(?,?)`,
            [data.content, data.infor],
        );
        console.log(data);
        if (updateReportType.affectedRows > 0) {
            const [report_type] = await pool.query(`SELECT * FROM report_type WHERE status= 0 `);
            const io = getIO();
            console.log(report_type);
            const report = report_type;
            io.emit('delete_report_type', { report });
            // Lấy ID của trường mới được tạo
            const newReportTypeId = updateReportType.insertId;

            // Lấy thông tin của trường mới được tạo dựa trên ID
            const [newReportType] = await pool.query(`SELECT * FROM report_type WHERE id = ?`, [
                newReportTypeId,
            ]);
            return {
                EM: 'get type report successfully',
                EC: 0,
                DT: newReportType[0],
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
export const reportService = {
    TypeReport,
    TypeReportAPI,
    SetReport,
    getReport,
    banReportById,
    unbanReportById,
    editReportType,
    addReportType,
    banReportType,
    unbanReportType
};
