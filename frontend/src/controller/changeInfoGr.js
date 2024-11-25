// controller/SongController.js
import axios from '../setup/axios';

export const changeInfoGrAvtCtrl = (data) => {
    return axios.post(`/api/changeAvtGr`, data);
};
export const changeInfoGrNameCtrl = (data) => {
    return axios.post(`/api/changeNameGr`, data);
};
