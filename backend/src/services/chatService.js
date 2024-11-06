import pool from '../connectDB.js';

const createChat = async (senderid, friendid, groupid, content, time, numlike) => {
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


const getChat = async (userId, roomId) => {
  try {
    console.log(userId,roomId);
    
    

    // Lấy tin nhắn giữa hai người dùng
    const [rows] = await pool.query(
      `SELECT
        t.id,
        t.content,
        t.time,
        CONCAT(u.firstname, ' ', u.lastname) AS senderName,u.id AS senderid,
        u.avatar AS avt
        FROM tinnhan t
        JOIN thanhvien tv ON t.idThanhvien = tv.id
        JOIN nguoidung u ON tv.userid = u.id
        WHERE t.idRoom = ?`,
      [roomId]
    );
    return {
      EM: 'Success',
      EC: 0,
      DT: rows,
    };
  } catch (error) {
    console.log('SERVICE | GET CHAT SERVICE | ERROR | ', error);
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};


const createRoom = async (userOneId, userTwoId) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO phongchat(useroneid, usertwoid) VALUES (?, ?)`,
      [userOneId, userTwoId]
    );
    if (result.affectedRows > 0) {
      const [newRoom] = await pool.query(
        `SELECT id, useroneid, usertwoid FROM phongchat WHERE id = ?`,
        [result.insertId]
      );
      return {
        EM: 'Success',
        EC: 0,
        DT: newRoom
      };
    } else {
      return {
        EM: 'Failed to create room',
        EC: -1,
        DT: []
      };
    }
  } catch (error) {
    console.log('SERVICE | CREATE ROOM SERVICE | ERROR | ', error);
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
    console.log('SERVICE | DELETE CHAT SERVICE | ERROR | ', error);
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
  createRoom
};