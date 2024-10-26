// controller/SongController.js
import axios from '../setup/axios';

export const sentChatCtrl = (data) => {
    return axios.post(`/api/chat`,data);
};
