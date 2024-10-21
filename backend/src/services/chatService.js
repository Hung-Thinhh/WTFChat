import pool from '../connectDB.js';

const createChat = async (senderid, friendid, groupid, content, time, numlike) => {
  try {
    const [result] = await pool.query(`INSERT INTO tinnhan(senderid, friendid, groupid, content, time, numlike) VALUES (?,?,?,?,CURRENT_TIMESTAMP,?)`, [senderid, friendid, groupid, content, numlike]); // thêm một tin nhắn mới
    if (result.affectedRows > 0) {
      const [rowss] = await pool.query(`SELECT id, senderid, friendid, groupid, content, time, numlike FROM tinnhan WHERE id = ?`, [result.insertId]);
      return {
        EM: 'Success',
        EC: 0,
        DT: rowss[0] // chỉ lấy tin nhắn mới nhất vừa tạo
      };
    } else {
      return {
        EM: 'Failed to insert data',
        EC: -1,
        DT: []
      };
    }
  } catch (error) {
    console.log('SERVICE | CHAT SERVICE | ERROR | ', error); // dAev only
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};


const getChat = async (id) => {
  try {
    const [rowss] = await pool.query(`SELECT id, senderid, friendid, groupid, content, time, numlike FROM tinnhan WHERE senderid = ? or friendid = ?`, [id, id]);
    return {
      EM: 'Success',
      EC: 0,
      DT: rowss
    };
  } catch (error) {
    console.log('SERVICE | CHAT SERVICE | ERROR | ', error);
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};


const deletaChat = async () => {
  try {
    const [rowss] = await pool.query(`DELETE FROM tinnhan`);
    return {
      EM: 'Success',
      EC: 0,
      DT: rowss
    };
  } catch (error) {
    console.log('SERVICE | CHAT SERVICE | ERROR | ', error);
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};



module.exports = {
  createChat,
  getChat,
  deletaChat,
};