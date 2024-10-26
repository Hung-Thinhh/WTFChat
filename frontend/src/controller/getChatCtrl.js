// controller/SongController.js
import axios from '../setup/axios';

export const getChatCtrl = (data) => {
    return axios.post(`/api/getchat`,data);
};
