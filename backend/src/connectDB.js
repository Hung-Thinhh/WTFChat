import mysql from "mysql2/promise";
import util from "util";
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DBNAME,
  port: process.env.SQL_PORT,
});

export const queryAsync = util.promisify(pool.query).bind(pool);

pool
  .getConnection()
  .then((connection) => {
    console.log("Kết nối thành DB công!");
    connection.release();
  })
  .catch((err) => {
    console.error("Kết nối thất bại:", err);
  });

export default pool;
