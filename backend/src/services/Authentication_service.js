require('dotenv').config();
import bcrypt from 'bcryptjs';
import User from '../models/user_model.js';
// const { getGroupWithRole } = require("./jwt-services.js");
const { createToken } = require('../middleware/jwt.js');
// get the promise implementation, we will use bluebird
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
import { v4 as uuidv4 } from 'uuid';
import { queryAsync } from '../connectDB.js';

const hashPassword = (password) => {
    const pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash;
};

const checkEmail = async (email) => {
    // add check by sending email add later
    try {
        await queryAsync('START TRANSACTION');
        const user = await queryAsync(`SELECT email FROM xacthuc WHERE email = ?`, [email]);

        await queryAsync('COMMIT');

        return user.length > 0;
    } catch (err) {
        await queryAsync('ROLLBACK');

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
            EM: 'No Data',
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
    else if (getAge(input.birthdate) <= 13)
        return {
            EM: 'REGISTER | ERROR | User ages must higher than 13',
            EC: '400',
        };
    else if (gender < 0 || gender > 3)
        return {
            EM: 'REGISTER | ERROR | Gender not exists',
            EC: '400',
        };

    const isEmailExist = await checkEmail(data.email);

    if (isEmailExist) {
        return {
            EM: 'REGISTER | ERROR | Email already exists',
            EC: '400',
        };
    } else {
        try {
            await queryAsync('START TRANSACTION');
            const hashPass = hashPassword(data.password);
            const firstName = username.split(' ').slice(0, -1).join(' ');
            const lastName = username.split(' ').slice(-1).join(' ');

            // insert user information
            await queryAsync(
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
            await queryAsync(
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
            await queryAsync('ROLLBACK');

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
        const user = await User.findOne({
            $or: [{ email: data.valueLogin }, { username: data.valueLogin }],
        });
        if (user) {
            let isCorrectPassword = await checkPassword(data.password, user.password);
            if (isCorrectPassword) {
                // let groupWithRole = await getGroupWithRole(user);
                let payload = {
                    id: user.id,
                    email: user.email,
                    type_login: user.type_login,
                    username: user.username,
                };
                let token = createToken(payload);
                return {
                    EM: 'ok!',
                    EC: '0',
                    DT: {
                        access_token: token,
                        avt: user.avt,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        } else {
            return {
                EM: 'Your email/phone or password is incorrect!',
                EC: '2',
                DT: '',
            };
        }

        return {
            EM: 'Your email/phone or password is incorrect!',
            EC: '1',
            DT: '',
        };
    } catch (error) {
        console.log('error: >>>>', error);
        return {
            EM: 'error creating user',
            EC: '2',
            DT: '',
        };
    }
};
const handleAuthGG = async (token) => {
    try {
        const user = await User.findOne({
            token: token,
        });
        console.log(user);
        if (user) {
            user.token = generateId();
            await user.save();
            // let groupWithRole = await getGroupWithRole(user);
            let payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                type_login: user.type_login,
            };
            let token = createToken(payload);
            return {
                EM: 'ok!',
                EC: '0',
                DT: {
                    access_token: token,
                    avt: user.avt,
                    email: user.email,
                    username: user.username || '',
                },
            };
        } else {
            console.log('hahah');
            return {
                EM: 'Your email/phone or password is incorrect!',
                EC: '2',
                DT: '',
            };
        }
    } catch (error) {
        console.log('error: >>>>', error);
        return {
            EM: 'error creating user',
            EC: '2',
            DT: '',
        };
    }
};
const handleCheckAccount = async (id) => {
    const user = await User.findOne({
        id: id,
    });
    // console.log(user);
    // console.log(id);
    if (user) {
        return {
            EM: 'ok!',
            EC: '0',
            DT: user,
        };
    }
};
module.exports = {
    handleRegister,
    handleLogin,
    handleAuthGG,
    checkEmail,
    generateId,
    checkPassword,
    hashPassword,
    handleCheckAccount,
};
