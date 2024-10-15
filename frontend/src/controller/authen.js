import { postData } from 'lib/function/function';
import axios from '../setup/axios';
import env from 'react-dotenv';

export const register = (data) => {
    return postData(`/api/register`, data);
};

export const login = (data) => {
    return postData(`/api/login`, data);
};

export const logout = (data) => {
    return axios.get(`/api/logout`, data);
};

export const checkaccount = () => {
    return axios.get(`/api/checkaccount`);
};
