// controller/SongController.js
import axios from '../setup/axios';

export const createChatRoomCtrl = (data) => {
    return axios.post(`/api/createroom`, data);
};
