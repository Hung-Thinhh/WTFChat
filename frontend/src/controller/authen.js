import axios from '../setup/axios';
import env from 'react-dotenv';
import crypto from 'crypto-browserify';

const encrypt = (message) => {
    // Create a TextEncoder instance
    const encoder = new TextEncoder();

    // Encode the string to UTF-8
    const bufferMessage = encoder.encode(message);

    const encryptedMessage = crypto.publicEncrypt(env.PUBLIC_KEY, bufferMessage);

    return encryptedMessage.toString();
};

export const register = (data) => {
    return axios.post(`/api/register`, encrypt(data));
};

export const login = (data) => {
    return axios.post(`/api/login`, encrypt(data));
};

export const logout = (data) => {
    return axios.get(`/api/logout`, data);
};

export const checkaccount = () => {
    return axios.get(`/api/checkaccount`);
};
