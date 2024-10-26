import mysql from 'mysql2/promise';
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DBNAME,
    port: process.env.SQL_PORT,

    // waitForConnections: true,
    // connectionLimit: 100,
});

pool.getConnection()
    .then((connection) => {
        console.log('Kết nối thành DB công!');
        connection.release();
    })
    .catch((err) => {
        console.error('Kết nối thất bại:', err);
    });

// Đóng kết nối khi có lỗi hoặc khi server đóng
const closePool = async () => {
    try {
        await pool.end();
        console.log('Đã đóng kết nối cơ sở dữ liệu.');
    } catch (err) {
        console.error('Lỗi khi đóng kết nối cơ sở dữ liệu:', err);
    }
};

process.on('SIGINT', closePool);
process.on('SIGTERM', closePool);
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    closePool().then(() => process.exit(1));
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    closePool().then(() => process.exit(1));
});

export default pool;
