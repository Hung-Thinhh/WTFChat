// controller/SongController.js
import axios from '../setup/axios';

export const register = (data) => {
    return axios.post(`/api/register`, data);
};
