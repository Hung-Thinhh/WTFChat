require('dotenv').config();
import bcrypt from 'bcryptjs';
// const { getGroupWithRole } = require("./jwt-services.js");
const { createToken } = require('../middleware/jwt.js');
// get the promise implementation, we will use bluebird
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
import { v4 as uuidv4 } from 'uuid';
import { getAge } from '../lib/globalFunct.js';
import { query } from '../connectDB.js';

const hashPassword = (password) => {
    const pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash;
};

const checkEmail = async (email) => {
    // add check by sending email add later
    try {
        await query('START TRANSACTION');
        const user = await query(`SELECT email FROM xacthuc WHERE email = ?`, [email]);

        await query('COMMIT');

        return user.length > 0;
    } catch (err) {
        await query('ROLLBACK');

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
            EM: 'REGISTER | ERROR | No Data',
            EC: '400',
        };

    const { email, username, password, birthdate, gender } = data;
    // first check
    if (!email)
        return {
            EM: "REGISTER | ERROR | Email can't empty",
            EC: '400',
        };
    else if (!username)
        return {
            EM: "REGISTER | ERROR | Username can't empty",
            EC: '400',
        };
    else if (password.length < 8 || password.length > 50)
        return {
            EM: 'REGISTER | ERROR | Password must from 8 to 50 characters',
            EC: '400',
        };
    else if (!birthdate)
        return {
            EM: "REGISTER | ERROR | Birthdate can't empty",
            EC: '400',
        };
    else if (getAge(birthdate) <= 13)
        return {
            EM: 'REGISTER | ERROR | User ages must higher than 13',
            EC: '400',
        };
    else if (gender < 0 || gender > 3)
        return {
            EM: 'REGISTER | ERROR | Gender not exists',
            EC: '400',
        };

    console.log('aaaa');

    const isEmailExist = await checkEmail(data.email);
    console.log(isEmailExist);

    if (isEmailExist) {
        return {
            EM: 'REGISTER | ERROR | Email already exists',
            EC: '400',
        };
    } else {
        try {
            await query('START TRANSACTION');
            const hashPass = hashPassword(data.password);
            const firstName = username.split(' ').slice(0, -1).join(' ');
            const lastName = username.split(' ').slice(-1).join(' ');

            // insert user information
            await query(
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
            await query(
                `INSERT INTO  xacthuc (email, password, EC) VALUES (
					?,
					?, 
					?,
				)`,
                [email, hashPass, true],
            );

            return {
                EM: 'REGISTER | INFO | Register success',
                EC: '200',
            };
        } catch (error) {
            await query('ROLLBACK');

            console.log('SERVICE | REGISTER | ERROR | ', error);
            return {
                EM: 'REGISTER | ERROR | ' + error,
                EC: '500',
            };
        }
    }
};

// const handleLogin = async (data) => {
//     try {
//         const user = await User.findOne({
//             $or: [{ email: data.valueLogin }, { username: data.valueLogin }],
//         });
//         if (user) {
//             let isCorrectPassword = await checkPassword(data.password, user.password);
//             if (isCorrectPassword) {
//                 // let groupWithRole = await getGroupWithRole(user);
//                 let payload = {
//                     id: user.id,
//                     email: user.email,
//                     type_login: user.type_login,
//                     username: user.username,
//                 };
//                 let token = createToken(payload);
//                 return {
//                     EM: 'ok!',
//                     EC: '0',
//                     DT: {
//                         access_token: token,
//                         avt: user.avt,
//                         email: user.email,
//                         username: user.username,
//                     },
//                 };
//             }
//         } else {
//             return {
//                 EM: 'Your email/phone or password is incorrect!',
//                 EC: '2',
//                 DT: '',
//             };
//         }

//         return {
//             EM: 'Your email/phone or password is incorrect!',
//             EC: '1',
//             DT: '',
//         };
//     } catch (error) {
//         console.log('error: >>>>', error);
//         return {
//             EM: 'error creating user',
//             EC: '2',
//             DT: '',
//         };
//     }
// };
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
