import { adminUser } from '../services/AdminGroupService';

const getListGroup = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await adminUser.getGroups(page);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
};
const getListGroupAPI = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await adminUser.getGroups(page);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);

        return null;
    }
};
const getGroupById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.getGroupByID(id);
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

const banGroupById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.banGroupById(id);
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
const unbanGroupById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await adminUser.unbanGroupById(id);
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
export { getListGroup, getListGroupAPI, banGroupById, unbanGroupById };
