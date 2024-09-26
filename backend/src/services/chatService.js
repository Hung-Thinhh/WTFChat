import pool from '../connectDB.js';

const createChat = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM message');
    return {
      EM: 'Success',
      EC: 0,
      DT: rows
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