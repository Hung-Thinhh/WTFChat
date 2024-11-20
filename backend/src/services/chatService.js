import pool from '../connectDB.js';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
// import e from 'cors';

const GOOGLE_DRIVE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const REDIRECT_URL = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_DRIVE_CLIENT_ID,
  GOOGLE_DRIVE_CLIENT_SECRET,
  REDIRECT_URL,
);
oauth2Client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});


const uploadImage = async (file) => {
  try {
    const createFile = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
      },
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(path.join(__dirname, '/../../uploads', file.filename)),
      },
    });
    const fileId = createFile.data.id;

    // share image public
    drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Remove the temporary file
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log('SERVICE | UPLOAD_IMAGE | ERROR | ', err);
      }
    });

    return fileId;
  } catch (error) {
    console.error('SERVICE | UPLOAD_IMAGE | ERROR |', error);
  }
};

const createChat = async (senderid, roomid, content, time, media, traloi) => {
  try {
    let fileId = null;
    if (media) {
      console.log('SERVICE | CREATE CHAT SERVICE | MEDIA | ', media);
      fileId = 'https://drive.google.com/thumbnail?id=' + await uploadImage(media);
      const [result] = await pool.query(`
        INSERT INTO tinnhan (content, idThanhvien, idRoom, time, image, traloi) 
        SELECT 
            ?, tv.id, ?, ?, ?, ?
        FROM thanhvien tv
        JOIN nguoidung u ON tv.userid = u.id
        WHERE u.id = ? AND tv.idRoom = ?;
        `,
        [content, roomid, time, fileId, traloi ? traloi : null, senderid, roomid]); // thêm một tin nhắn mới
      console.log('SERVICE | CREATE CHAT SERVICE | NEW MESSAGE | ', content, roomid, time, fileId, traloi, senderid, roomid);
      await pool.query(`UPDATE phongchat SET update_time = ? WHERE id = ?`, [time, roomid]);
      if (result.affectedRows > 0) {
        const [newMessage] = await pool.query(`SELECT tinnhan.*, thanhvien.userid FROM tinnhan, thanhvien WHERE tinnhan.id = ? AND tinnhan.idThanhvien = thanhvien.id AND tinnhan.status = 0`, [result.insertId]);
        return {
          EM: 'Success',
          EC: 0,
          DT: newMessage[0]
        };
      } else {
        return {
          EM: 'Failed to insert data',
          EC: -1,
          DT: []
        };
      }
    } else { // nếu không có tệp đính kèm
      console.log('SERVICE | CREATE CHAT SERVICE | NO MEDIA | ');
      const [result] = await pool.query(`
        INSERT INTO tinnhan (content, idThanhvien, idRoom, time, traloi) 
        SELECT 
            ?, tv.id, ?, ?, ?
        FROM thanhvien tv
        JOIN nguoidung u ON tv.userid = u.id
        WHERE u.id = ? AND tv.idRoom = ?;
        `,
        [content, roomid, time, traloi ? traloi : null, senderid, roomid]); // thêm một tin nhắn mới
      console.log('SERVICE | CREATE CHAT SERVICE | NEW MESSAGE | ', content, roomid, time, fileId, traloi, senderid, roomid);
      await pool.query(`UPDATE phongchat SET update_time = ? WHERE id = ?`, [time, roomid]);
      if (result.affectedRows > 0) {
        const [newMessage] = await pool.query(`SELECT tinnhan.*, thanhvien.userid FROM tinnhan, thanhvien WHERE tinnhan.id = ? AND tinnhan.idThanhvien = thanhvien.id AND tinnhan.status = 0`, [result.insertId]);
        return {
          EM: 'Success',
          EC: 0,
          DT: newMessage[0]
        };
      } else {
        return {
          EM: 'Failed to insert data',
          EC: -1,
          DT: []
        };
      }
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


const getChat = async (userId, roomId, offset) => {
  try {
    // Lấy tin nhắn giữa hai người dùng
    const [rows] = await pool.query(
      `SELECT
      t.id,
      t.content,
      t.time,
      t.image,
      t.traloi,
      CONCAT(u.firstname, ' ', u.lastname) AS senderName,u.id AS senderid,
      u.avatar AS avt
      FROM tinnhan t
      JOIN thanhvien tv ON t.idThanhvien = tv.id
      JOIN nguoidung u ON tv.userid = u.id
      WHERE t.idRoom = ? AND t.status = 0
      ORDER BY t.time DESC
      LIMIT 50 OFFSET ?`,
      [roomId, offset]
    );
    return {
      EM: 'Success',
      EC: 0,
      DT: rows.reverse(),
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

const deletaChat = async (id) => {
  try {
    const [result] = await pool.query(`UPDATE tinnhan SET status = 1 WHERE id = ?`, [ id]);
    return {
      EM: 'Success',
      EC: 0,
      DT: result
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



const getInfo = async (roomId) => {
  try {
    const [rows] = await pool.query(
      `SELECT
      t.id,
      t.time,
      t.image,
      CONCAT(u.firstname, ' ', u.lastname) AS senderName,
      u.id AS senderid,
      u.avatar AS avt
      FROM tinnhan t
      JOIN thanhvien tv ON t.idThanhvien = tv.id
      JOIN nguoidung u ON tv.userid = u.id
      WHERE t.idRoom = ?
        AND t.image IS NOT NULL
      ORDER BY t.time
      `,
      [roomId],
    );
    return {
      EM: 'Success',
      EC: 1,
      DT: rows,
    };
  } catch (error) {
    console.log('SERVICE | GET CHAT ROOM SERVICE | ERROR | ', error);
    return {
      EM: 'Database query error',
      EC: -1,
      DT: [],
    };
  }
}


module.exports = {
  createChat,
  getChat,
  deletaChat,
  createRoom,
  getInfo
};