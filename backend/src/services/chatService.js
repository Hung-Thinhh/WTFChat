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


const getChat = async (userId, friendId) => {
  try {
    // Lấy ID phòng chat giữa hai người dùng
    const [roomRows] = await pool.query(
      `SELECT id FROM phongchat WHERE (useroneid = ? AND usertwoid = ?) OR (useroneid = ? AND usertwoid = ?)`,
      [userId, friendId, friendId, userId]
    );

    let roomId;
    if (roomRows.length > 0) {
      roomId = roomRows[0].id;
    } else {
      // Nếu phòng chưa tồn tại, tạo phòng mới
      const [result] = await pool.query(
        `INSERT INTO phongchat(useroneid, usertwoid) VALUES (?, ?)`,
        [userId, friendId]
      );
      roomId = result.insertId;
    }

    // Lấy tin nhắn giữa hai người dùng
    const [rows] = await pool.query(
      `SELECT id, senderid, friendid, groupid, content, time, numlike 
       FROM tinnhan 
       WHERE (senderid = ? AND friendid = ?) OR (senderid = ? AND friendid = ?)
       ORDER BY time ASC`,
      [userId, friendId, friendId, userId]
    );

    return {
      EM: 'Success',
      EC: 0,
      DT: { rows, roomId },
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