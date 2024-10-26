import pool from '../connectDB.js';
const HomeService = async () => {
    try {
        const countUser = await pool.query('SELECT COUNT(*) FROM nguoidung');        
        const countGroup = await pool.query('SELECT COUNT(*) FROM nhom');        
        const countChat = await pool.query('SELECT COUNT(*) FROM tinnhan');        
        const countReport = await pool.query('SELECT COUNT(*) FROM baocao');  
        // const countUserCreate = await pool.query(`
        //     SELECT strftime('%Y-%m', ngay_tao) AS Thang, COUNT(*) AS SoLuongUser 
        //     FROM user
        //     WHERE strftime('%Y', ngay_tao) = strftime('%Y', 'now')
        //     GROUP BY Thang
        //     ORDER BY Thang;`)
        return {
            user: countUser[0][0]['COUNT(*)'],
            chat: countChat[0][0]['COUNT(*)'],
            group: countGroup[0][0]['COUNT(*)'],
            report: countReport[0][0]['COUNT(*)']
        }
    } catch (error) {
        console.log(error);
        
        return error
    }
};
export const adminHome ={
    HomeService
}