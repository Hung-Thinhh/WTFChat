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
            EM: 'REGISTER | ERROR | Mật khẩu nhập lại không trùng khớp',
            EC: '400',
        };
    else if (!birthdate)
        return {
            EM: 'REGISTER | ERROR | Ngày sinh không thể để trống',
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

            await pool.query('COMMIT');
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
    if (!data)
        return {
            EM: 'LOGIN | ERROR | Không có dữ liệu',
            EC: '401',
        };

    if (!data.email)
        return {
            EM: 'LOGIN | ERROR | Email không thể để trống',
            EC: '400',
        };
    else if (!data.password)
        return {
            EM: 'LOGIN | ERROR | Mật khẩu phải có 8 - 50 kí tự',
            EC: '400',
        };

    try {
        // get email
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `SELECT xacthuc.email, xacthuc.password, xacthuc.status, xacthuc.role, nguoidung.lastname, nguoidung.avatar
            FROM xacthuc 
            INNER JOIN nguoidung ON xacthuc.email=nguoidung.email
            WHERE xacthuc.email = ?`,
            [data.email],
        );

        await pool.query('COMMIT');

        if (!currUser[0][0])
            return {
                EM: 'LOGIN | ERROR | Tài khoản không tồn tại',
                EC: '400',
                DT: '',
            };

        const { email, password, status, role, lastname, avatar } = currUser[0][0];

        // check status
        if (!status)
            return {
                EM: 'LOGIN | ERROR | Tài khoản hiện đăng bị khoá',
                EC: '400',
                DT: '',
            };

        // check password
        const isCorrectPassword = await checkPassword(data.password, password);
        if (!isCorrectPassword)
            return {
                EM: 'LOGIN | ERROR | Mật khẩu không chính xác',
                EC: '400',
                DT: '',
            };

        let payload = {
            email,
            role,
        };
        let token = createToken(payload);

        // change to switch case if have more role
        if (role === 0)
            // admin
            return {
                EM: 'LOGIN | INFO | Đăng nhập quản trị thành công',
                EC: '201',
                DT: {
                    email,
                    access_token: token,
                    avt: avatar,
                    username: lastname,
                },
            };

        // nomal user
        return {
            EM: 'LOGIN | INFO | Đăng nhập thành công',
            EC: '200',
            DT: {
                email,
                access_token: token,
                avt: avatar,
                username: lastname,
            },
        };
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('SERVICE | LOGIN | ERROR |', error);
        return {
            EM: 'LOGIN | ERROR | ' + error,
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

const handleCheckAccount = async (email) => {
    try {
        await pool.query('START TRANSACTION');

        const currUser = await pool.query(
            `SELECT xacthuc.email, xacthuc.status, nguoidung.lastname, nguoidung.avatar
            FROM xacthuc 
            INNER JOIN nguoidung ON xacthuc.email=nguoidung.email
            WHERE xacthuc.email = ?`,
            [email],
        );

        await pool.query('COMMIT');

        if (!currUser) {
            return {
                EM: 'CHECKACCOUNT | ERROR | Xác thực thất bại',
                EC: '403',
            };
        }

        return {
            EM: 'CHECKACCOUNT | INFO | Xác thực thành công',
            EC: '200',
            DT: currUser[0][0],
        };
    } catch (error) {
        console.log('SERVICE | CHECKACCOUNT | ERROR |', error);
        return {
            EM: 'CHECKACCOUNT | ERROR |', error,
            EC: '500',
        };
    }
};
export const services = {
    handleRegister,
    handleLogin,
    // handleAuthGG,
    checkEmail,
    generateId,
    checkPassword,
    hashPassword,
    handleCheckAccount,
};
