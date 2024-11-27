// controller/SongController.js
import axios from '../setup/axios';

export const muteCtrl = (data) => {
    return axios.post(`/api/mute`,data);
};
