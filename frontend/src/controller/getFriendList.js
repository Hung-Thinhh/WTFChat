import axios from '../setup/axios';

export const getFriendListCtrl = (data) => {
    return axios.post(`/api/friendList`,data);
};
