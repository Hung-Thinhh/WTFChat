import {reportService} from '../services/AdminReportService';
const getReportType = async (req, res) => {
    try {
        const result = await reportService.TypeReport();
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const getReportTypeAPI = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await reportService.TypeReportAPI(page);
        if (result) {
            console.log(result);
            
            return result;
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const sendReport = async (req, res) => {
    try {
        const result = await reportService.SetReport(req.body);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const getReport = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await reportService.getReport(page);
        if (result) {
            
            return result;
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const getReportAPI = async (req, res) => {
    try {
        const page = req.params.page || null;
        const result = await reportService.getReport(page);
        if (result) {
            console.log(result);
            
            return res.status(200).json(result);
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const banReportById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await reportService.banReportById(id);
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
const unbanReportById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await reportService.unbanReportById(id);
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
const editReportType = async (req, res) => {
    try {
        console.log(req.body);
        
        const result = await reportService.editReportType(req.body);
        if (result) {
            return res.status(200).json({
                EM: 'Update Report Type successfully',
                EC: 0,
                DT: [],
            });
        } else {
            return {
                EM: error.message,
                EC: 1,
                DT: [],
            };
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
const addReportType = async (req, res) => {
    try {
        console.log(req.body);
        
        const result = await reportService.addReportType(req.body);
        if (result) {
            return res.status(200).json({
                EM: 'Update Report Type successfully',
                EC: 0,
                DT: result.DT,
            });
        } else {
            return {
                EM: error.message,
                EC: 1,
                DT: [],
            };
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
const banReportType = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await reportService.banReportType(id);
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
const unbanReportType = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await reportService.unbanReportType(id);
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
const getReportByIdUser = async (req, res) => {
    try {
        const page = req.params.id;
        const result = await reportService.getReportByIdUser(page);
        if (result) {
            console.log(result);
            
            return res.status(200).json(result);
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
const getReportByIdGroup = async (req, res) => {
    try {
        const page = req.params.id;
        const result = await reportService.getReportByIdGroup(page);
        if (result) {
            console.log(result);
            
            return res.status(200).json(result);
        } else {
            return res.status(200).json({
                EM: error.message,
                EC: 1,
                DT: [],
            });
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
export {
    getReportType,
    getReportTypeAPI,
    sendReport,
    getReport,
    getReportAPI,
    banReportById,
    unbanReportById,
    editReportType,
    addReportType,
    banReportType,
    unbanReportType,
    getReportByIdUser,
    getReportByIdGroup
};
