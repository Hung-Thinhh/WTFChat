import axios from '../setup/axios';
import env from 'react-dotenv';
import CryptoJS from 'crypto-js';
import RSA from 'crypto-js/'

const publicKey = env.PUBLIC_KEY;

// only for post 
const postData = (api, data) => { 
    if (!publicKey) {
        alert('Public key not loaded yet!');
        return;
    }

    // Encrypt the data using the public key
    const encryptedData = CryptoJS.RSA.encrypt(
        JSON.stringify(data), // Encrypt the data as a JSON string
        CryptoJS.RSA.getKey(publicKey)
    ).toString();

    // Now send the encrypted data using Axios:
    return axios.post(api, { encryptedData })
};


export const register = (data) => {
    return postData(`/api/register`, data);
};

export const login = (data) => {
    console.log(publicKey);
    return postData(`/api/login`, data);
};

export const logout = (data) => {
    return axios.get(`/api/logout`, data);
};

export const checkaccount = () => {
    return axios.get(`/api/checkaccount`);
};
