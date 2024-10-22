import { postData } from 'lib/function/function';
import axios from '../setup/axios';

export const register = (data) => {
    return postData(`/api/register`, data);
};

export const login = (data) => {
    return postData(`/api/login`, data);
};

export const sendOTP = (data) => {
    return postData(`/api/sendOTP`, data);
};

export const logout = (data) => {
    return axios.get(`/api/logout`, data);
};

export const checkaccount = () => {
    return axios.get(`/api/checkaccount`);
};

export const getPublicKey = () => {
    return axios.get(`/api/getPublicKey`);
};
