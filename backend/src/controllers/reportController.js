import {reportService} from '../services/reportService';
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
export { getReportType };
