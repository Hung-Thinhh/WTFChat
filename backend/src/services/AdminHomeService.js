import pool from '../connectDB.js';
const HomeService = async () => {
    try {
        const countUser = await pool.query('SELECT COUNT(*) FROM nguoidung');
        const countGroup = await pool.query('SELECT COUNT(*) FROM phongchat WHERE type=1');
        const countChat = await pool.query('SELECT COUNT(*) FROM tinnhan');
        const countReport = await pool.query('SELECT COUNT(*) FROM baocao');
        //line_chart
        const countUserCreate = await pool.execute(
            `
            SELECT DATE_FORMAT(time, '%m') AS Thang, COUNT(*) AS SoLuongUser 
            FROM xacthuc
            WHERE DATE_FORMAT(time, '%Y') = DATE_FORMAT(NOW(), '%Y')
            GROUP BY Thang
            ORDER BY Thang;
        `,
        );
        console.log(countUserCreate);
        
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const line_chart = months.map(month => {
            const found = countUserCreate[0].find(item => item.Thang === month);
            return found ? found.SoLuongUser : 0;
        });

          //line_chart
          const countMess = await pool.execute(
        `SELECT 
            phongchat.type,
            COUNT(tinnhan.id) AS 'total_messages'
            FROM 
                phongchat
            JOIN 
                tinnhan ON phongchat.id = tinnhan.idRoom
            GROUP BY 
        phongchat.type`
        );
        console.log(countMess);
        const pie_chart = countMess[0].map(item => item.total_messages);
        console.log(pie_chart);

        return {
            user: countUser[0][0]['COUNT(*)'],
            chat: countChat[0][0]['COUNT(*)'],
            group: countGroup[0][0]['COUNT(*)'],
            report: countReport[0][0]['COUNT(*)'],
            line_chart:line_chart,
            pie_chart:pie_chart
        };
    } catch (error) {
        console.log(error);

        return error;
    }
};
export const adminHome = {
    HomeService,
};
