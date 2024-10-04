require('dotenv').config();
import bcrypt from 'bcryptjs';
// const { getGroupWithRole } = require("./jwt-services.js");
const { createToken } = require('../middleware/jwt.js');
// get the promise implementation, we will use bluebird
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
import { v4 as uuidv4 } from 'uuid';
import { getAge } from '../lib/globalFunct.js';
import pool from '../connectDB.js';

const hashPassword = (password) => {
    const pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash;
};

const checkEmail = async (email) => {
    // add check by sending email add later
    try {
        await pool.query('START TRANSACTION');
        const user = await pool.query(`SELECT email FROM xacthuc WHERE email = ?`, [email]);

        await pool.query('COMMIT');
        return user[0].length > 0;
    } catch (err) {
        await pool.query('ROLLBACK');

        console.log('CHECK_EMAIL | ERROR | ', err);
        return false;
    }
};

const checkPassword = async (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const generateId = () => {
    return uuidv4();
};

const handleRegister = async (data) => {
    if (!data)
        return {
            EM: 'REGISTER | ERROR | Không có dữ liệu',
            EC: '401',
        };

    const { email, username, password, birthdate, gender } = data;
    // first check
    if (!email)
        return {
            EM: 'REGISTER | ERROR | Email không thể để trống',
            EC: '400',
        };
    else if (!username)
        return {
            EM: 'REGISTER | ERROR | Họ và tên không thể để trống',
            EC: '400',
        };
    else if (username.length > 100)
        return {
            EM: 'REGISTER | ERROR | Tên của bạn quá dài',
            EC: '400',
        };
    else if (password.length < 8 || password.length > 50)
        return {
            EM: 'REGISTER | ERROR | Mật khẩu phải có 8 - 50 kí tự',
            EC: '400',
        };
    else if (!birthdate)
        return {
            EM: "REGISTER | ERROR | Ngày sinh không thể để trống",
            EC: '400',
        };
    else if (getAge(birthdate) <= 13)
        return {
            EM: 'REGISTER | ERROR | Độ tuổi tối thiểu là 13',
            EC: '400',
        };
    else if (gender < 0 || gender > 3)
        return {
            EM: 'REGISTER | ERROR | Giới tính không tồn tại',
            EC: '400',
        };

    const isEmailExist = await checkEmail(data.email);

    if (isEmailExist) {
        return {
            EM: 'REGISTER | ERROR | Email đã tồn tại',
            EC: '400',
        };
    } else {
        try {
            await pool.query('START TRANSACTION');
            const hashPass = hashPassword(data.password);
            const firstName = username.split(' ').slice(0, -1).join(' ');
            const lastName = username.split(' ').slice(-1).join(' ');

            // insert user information
            const insertUser = await pool.query(
                `INSERT INTO  nguoidung (firstname, lastname, email, birthdate, gender) VALUES (
					?,
					?, 
					?,
					?,
					?
				)`,
                [firstName, lastName, email, birthdate, +gender],
            );

            // insert user authen
            await pool.query(
                `INSERT INTO  xacthuc (id, email, password, status) VALUES (
                        ?,
                        ?,
                        ?, 
                        ?
                    )`,
                [insertUser[0].insertId, email, hashPass, true],
            );

            return {
                EM: 'REGISTER | INFO | Đăng ký thành công',
                EC: '200',
            };
        } catch (error) {
            await pool.query('ROLLBACK');

            console.log('SERVICE | REGISTER | ERROR | ', error);
            return {
                EM: 'REGISTER | ERROR | ' + error,
                EC: '500',
            };
        }
    }
};

const handleLogin = async (data) => {
    try {
        // get email
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `SELECT email, password, status FROM xacthuc WHERE email = ?`,
            [data.email],
        );

        console.log(currUser);
        

        // if (user) {
        //     let isCorrectPassword = await checkPassword(data.password, user.password);
        //     if (isCorrectPassword) {
        //         // let groupWithRole = await getGroupWithRole(user);
        //         let payload = {
        //             id: user.id,
        //             email: user.email,
        //             type_login: user.type_login,
        //             username: user.username,
        //         };
        //         let token = createToken(payload);
        //         return {
        //             EM: 'ok!',
        //             EC: '0',
        //             DT: {
        //                 access_token: token,
        //                 avt: user.avt,
        //                 email: user.email,
        //                 username: user.username,
        //             },
        //         };
        //     }
        // } else {
        //     return {
        //         EM: 'Your email/phone or password is incorrect!',
        //         EC: '2',
        //         DT: '',
        //     };
        // }

        // return {
        //     EM: 'Your email/phone or password is incorrect!',
        //     EC: '1',
        //     DT: '',
        // };
    } catch (error) {
        console.log('error: >>>>', error);
        return {
            EM: 'REGISTER | ERROR | ' + error,
            EC: '500',
            DT: '',
        };
    }
};

// const handleAuthGG = async (token) => {
//     try {
//         const user = await User.findOne({
//             token: token,
//         });
//         console.log(user);
//         if (user) {
//             user.token = generateId();
//             await user.save();
//             // let groupWithRole = await getGroupWithRole(user);
//             let payload = {
//                 id: user.id,
//                 email: user.email,
//                 username: user.username,
//                 type_login: user.type_login,
//             };
//             let token = createToken(payload);
//             return {
//                 EM: 'ok!',
//                 EC: '0',
//                 DT: {
//                     access_token: token,
//                     avt: user.avt,
//                     email: user.email,
//                     username: user.username || '',
//                 },
//             };
//         } else {
//             console.log('hahah');
//             return {
//                 EM: 'Your email/phone or password is incorrect!',
//                 EC: '2',
//                 DT: '',
//             };
//         }
//     } catch (error) {
//         console.log('error: >>>>', error);
//         return {
//             EM: 'error creating user',
//             EC: '2',
//             DT: '',
//         };
//     }
// };
// const handleCheckAccount = async (id) => {
//     const user = await User.findOne({
//         id: id,
//     });
//     // console.log(user);
//     // console.log(id);
//     if (user) {
//         return {
//             EM: 'ok!',
//             EC: '0',
//             DT: user,
//         };
//     }
// };
export const services = {
    handleRegister,
    // handleLogin,
    // handleAuthGG,
    checkEmail,
    generateId,
    checkPassword,
    hashPassword,
    // handleCheckAccount,
};
