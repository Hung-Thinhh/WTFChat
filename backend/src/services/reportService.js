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
export const reportService = {
    TypeReport,
};
