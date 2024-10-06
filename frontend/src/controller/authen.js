// controller/SongController.js
import axios from '../setup/axios';

export const register = (data) => {
    return axios.post(`/api/register`, data);
};

export const login = (data) => {
    return axios.post(`/api/login`, data);
};

export const checkaccount = () => {
    return axios.get(`/api/login`);
};