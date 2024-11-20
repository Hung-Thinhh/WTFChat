import axios from '../setup/axios';

export const getReportType = () => {
    return axios.get(`/api/getReportType`);
};
export const sendReport = (data) => {
    return axios.post(`/api/sendReport`,data);
};
