import mysql from 'mysql2/promise';
import util from 'util';
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DBNAME,
    port: process.env.SQL_PORT,
});

// export const connection = () => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => { 
//             if (err) reject(err);
//             console.log('MySQL pool connected: threadId ' + connection.threadId);
//             const query = (sql, binding) => {
//                 return new Promise((resolve, reject) => {
//                     connection.query(sql, binding, (err, result) => {
//                         if (err) reject(err);
//                         resolve(result);
//                     });
//                 });
//             };
//             const release = () => {
//                 return new Promise((resolve, reject) => {
//                     if (err) reject(err);
//                     console.log('MySQL pool released: threadId ' + connection.threadId);
//                     resolve(connection.release());
//                 });
//             };
//             resolve({ query, release });
//         });
//     });
// };


// code nay ko quan trong
export const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

pool.getConnection()
    .then((connection) => {
        console.log('Kết nối thành DB công!');
        connection.release();
    })  
    .catch((err) => {  
        console.error('Kết nối thất bại:', err);
    });

// export const queryAsync = pool.query;

export default pool;
