// controller/SongController.js
import axios from '../setup/axios';

export const getChatRoomCtrl = (data) => {
    return axios.post(`/api/getchatroom`,data);
};
