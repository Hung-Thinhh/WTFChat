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
export { getReportType,sendReport,getReport,getReportAPI };
