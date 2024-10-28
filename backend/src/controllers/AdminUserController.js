import { adminUser } from '../services/AdminUserService';

const getListUser = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await adminUser.getUsers(page);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
};
const getListUserAPI = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await adminUser.getUsers(page);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);

        return null;
    }
};
const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.getUserByID(id);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);

        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const editUser = async (req, res) => {
    const data = req.body;

    try {
        const result = await adminUser.editUserById(data);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);

        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const banUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.banUserById(id);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);

        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
const unbanUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.unbanUserById(id);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);

        return {
            EM: error.message,
            EC: 1,
            DT: [],
        };
    }
};
export { getListUser, getUserById, editUser, getListUserAPI, banUserById, unbanUserById };
