import env from 'react-dotenv';
import CryptoJS from 'crypto-js';
import axios from 'setup/axios';

export function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const publicKey = env.PUBLIC_KEY;

// only for post 
export const postData = (api, data) => { 
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