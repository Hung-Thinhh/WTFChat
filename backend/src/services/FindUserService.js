import pool from '../connectDB.js';

const findUser = async (senderid, friendid, groupid, content, time, numlike) => {
  try {
    const [result] = await pool.query(`INSERT INTO tinnhan(senderid, friendid, groupid, content, time, numlike) VALUES (?,?,?,?,CURRENT_TIMESTAMP,?)`, [senderid, friendid, groupid, content, numlike]); // thêm một tin nhắn mới
    if (result.affectedRows > 0) {
      const [newMessage] = await pool.query(`SELECT id, senderid, friendid, groupid, content, time, numlike FROM tinnhan WHERE id = ?`, [result.insertId]);
      return {
        EM: 'Success',
        EC: 0,
        DT: newMessage
      };
    } else {
      return {
        EM: 'Failed to insert data',
        EC: -1,
        DT: []
      };
    }
  } catch (error) {
    console.log('SERVICE | CREATE CHAT SERVICE | ERROR | ', error); // dAev only
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};
module.exports = {
  findUser,
};