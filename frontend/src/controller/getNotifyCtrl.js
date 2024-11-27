// controller/SongController.js
import axios from '../setup/axios';

export const getNotifyCtrl = (data) => {
    return axios.post(`/api/getnotify`,data);
};
