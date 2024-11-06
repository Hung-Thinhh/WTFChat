// controller/SongController.js
import axios from '../setup/axios';

export const findUserController = (data) => {
    return axios.post(`/api/finduser`,data);
};
