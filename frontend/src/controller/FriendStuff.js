import axios from '../setup/axios';

export const getFriendListCtrl = (data) => {
    return axios.post(`/api/friendList`,data);
};

export const addFriendCtrl = (data) => {
    return axios.post(`/api/addFriend`,data);
};

export const delFriendCtrl = (data) => {
    return axios.post(`/api/delFriend`,data);
};

export const blockFriendCtrl = (data) => {
    return axios.post(`/api/blockFriend`,data);
};  