// controller/SongController.js
import axios from '../setup/axios';

export const leaveChatRoomCtrl = (data) => {
    return axios.post(`/api/leaveroom`, data);
};
