// controller/SongController.js
import axios from '../setup/axios';

export const getRoomInfo = (data) => {
    return axios.post(`/api/getroominfo`,data);
};
