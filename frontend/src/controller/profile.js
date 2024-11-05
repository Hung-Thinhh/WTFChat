import { postData } from 'lib/function/function';
import axios from '../setup/axios';

export const getUserInfo = () => {
    return axios.get(`/api/getUserInfo`);
};
