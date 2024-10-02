import pool from '../connectDB.js';

const createChat = async () => {
  const newid = Math.floor(Math.random() * 900) + 100;
  try {
    await pool.query(`INSERT INTO nguoidung(id,firstname,lastname,email,avatar) VALUES ('${newid}','TRAN','F','NGJ@GMAIL.COM','https://i.pinimg.com/236x/90/f9/cb/90f9cb5a242a89fbe620a07078753c7b.jpg')`);
    const [rowss] = await pool.query(`SELECT * FROM nguoidung`);
    return {
      EM: 'Success',
      EC: 0,
      DT: rowss
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      EM: 'Database query error',
      EC: -1,
      DT: []
    };
  }
};

export default createChat;