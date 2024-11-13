import axios from '../setup/axios';

export const getReportType = () => {
    return axios.get(`/api/getReportType`);
};
