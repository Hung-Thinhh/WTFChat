require('dotenv').config();
import jwt from 'jsonwebtoken';
import pool from '../connectDB.js';
export const createToken = (payload) => {
    let key = process.env.JWT_SECRET_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log('error create token: ', error);
    }
    return token;
};

export const verifyToken = (token) => {
    let key = process.env.JWT_SECRET_KEY;
    let decode = null;

    try {
        decode = jwt.verify(token, key);
    } catch (error) {
        console.log('error verifying token: ', error);
    }
    return decode;
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const SecurePaths = ['/checkaccount', '/getUserInfo', '/updateUserInfo'];

export const checkUserJWT = async (req, res, next) => {
    if (!SecurePaths.includes(req.path)) return next();
    let session = req.session;
    let tokenFromHeader = extractToken(req);
    const token = session && session.userId ? session.userId : tokenFromHeader;

    if (!token)
        return res.status(401).json({
            EM: 'JWT | ERROR | Xác thực thất bại',
            EC: '-1',
        });

    const decoded = verifyToken(token);

    if (!decoded)
        return res.status(401).json({
            EM: 'JWT | ERROR | Xác thực thất bại',
            EC: '401',
        });

    try {
        await pool.query('START TRANSACTION');
        const user = await pool.query(`SELECT status FROM xacthuc WHERE email = ?`, [
            decoded.email,
        ]);

        await pool.query('COMMIT');

        if (!user[0][0].status)
            return res.status(403).json({
                EM: 'JWT | ERROR | Tài khoản đã bị cấm',
                EC: '403',
            });
    } catch (error) {
        await pool.query('ROLLBACK');
        return res.status(500).json({
            EM: 'JWT | ERROR | ' + error,
            EC: '500',
        });
    }

    req.user = decoded;
    req.token = token;
    next();
};

export const checkUserPermission = async (req, res, next) => {
    if (req.user) {
        next();

        // const email = req.user.email;
        // const roles = req.user.groupWithRole.Roles;
        // const currUrl = req.path;
        // if (!roles || roles.length === 0) {
        //     return res.status(403).json({
        //         EC: '-1',
        //         DT: '',
        //         EM: `You don't have permission to access this resource...`,
        //     });
        // }
        // let canAccess = roles.some((item) => item.url === currUrl || currUrl.includes(item.url));
        // if (canAccess) {
        //     next();
        // } else {
        //     return res.status(403).json({
        //         EC: '-1',
        //         DT: '',
        //         EM: `You don't have permission to access this resource...`,
        //     });
        // }
    } else {
        return res.status(401).json({
            EC: '-1',
            DT: '',
            EM: 'Not authenticated the user',
        });
    }
};
