const getUserInfo = async (email) => {
    try {
        await pool.query('START TRANSACTION');

        const currUser = await pool.query(
            `SELECT firstname, lastname, birthdate, gender
            FROM nguoidung
            WHERE email = ?`,
            [email],
        );

        await pool.query('COMMIT');

        if (!currUser) {
            return {
                EM: 'GET_USER_INFO | ERROR | Lấy thông tin thất bại',
                EC: '403',
            };
        }

        return {
            EM: 'GET_USER_INFO | INFO | Lấy thông tin thành công',
            EC: '200',
            DT: currUser[0][0],
        };
    } catch (error) {
        console.log('SERVICE | CHECKACCOUNT | ERROR |', error);
        return {
            EM: 'GET_USER_INFO | ERROR |',
            error,
            EC: '500',
        };
    }
};

export const profileService = {
    getUserInfo,
};
