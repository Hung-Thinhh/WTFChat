import { createSelector } from '@reduxjs/toolkit';

// register
export const inputSelector = (state) => state.register.input;
export const errorSelector = (state) => state.register.err;
export const loadingSelector = (state) => state.register.loading;
export const showPassSelector = (state) => state.register.showPass;
export const otpSelector = (state) => state.register.otp;

export const registerSelector = createSelector(
    inputSelector,
    showPassSelector,
    errorSelector,
    loadingSelector,
    otpSelector,
    (input, showPass, err, loading, otp) => ({ input, showPass, err, loading, otp }),
);

// forgetPass
export const forgetPassInputSelector = (state) => state.forgetPass.input;
export const forgetPassErrorSelector = (state) => state.forgetPass.err;
export const forgetPassLoadingSelector = (state) => state.forgetPass.loading;
export const forgetPassShowPassSelector = (state) => state.forgetPass.showPass;
export const forgetPassOtpSelector = (state) => state.forgetPass.otp;
export const forgetPassSearchUserSelector = (state) => state.forgetPass.searchUser;

export const forgetPassSelector = createSelector(
    forgetPassInputSelector,
    forgetPassErrorSelector,
    forgetPassLoadingSelector,
    forgetPassShowPassSelector,
    forgetPassOtpSelector,
    forgetPassSearchUserSelector,
    (input, err, loading, showPass, otp, searchUser) => ({
        input,
        err,
        loading,
        showPass,
        otp,
        searchUser,
    }),
);

// sideBar
export const showMenuSelector = (state) => state.sidebar.showMenu;
export const offsetSelector = (state) => state.sidebar.offset;
export const setNewMessageSelector = (state) => state.sidebar.newMessage;

export const showMenu1Selector = createSelector(
    showMenuSelector,
    offsetSelector,
    setNewMessageSelector,
    (showMenu, offset, newMessage) => ({
        showMenu,
        offset,
        newMessage,
    }),
);

// chatRoom
export const chatRoomSelector = (state) => state.chatRoom.rooms;

export const chatRoomListSelector = createSelector(chatRoomSelector, (rooms) => rooms);

// profile
export const profileInitInputSelector = (state) => state.profile.initInput;
export const profileInputSelector = (state) => state.profile.input;
export const profileErrorSelector = (state) => state.profile.err;
export const profileLoadingSelector = (state) => state.profile.loading;

export const profileSelector = createSelector(
    profileInitInputSelector,
    profileInputSelector,
    profileErrorSelector,
    profileLoadingSelector,
    (initInput, input, err, loading) => ({
        initInput,
        input,
        err,
        loading,
    }),
);

// current user
export const currUserSelector = (state) => state.user.currUser;
export const checkAccountSelector = (state) => state.user.checkAccount;

export const userSelector = createSelector(
    currUserSelector,
    checkAccountSelector,
    (currUser, checkAccount) => ({
        currUser,
        checkAccount,
    }),
);
// chat data 
export const chatDataSelector = (state) => state.chatdata.chatData;
export const tempIdSelector = (state) => state.chatdata.tempId;

export const chatSelector = createSelector(
    chatDataSelector,
    tempIdSelector,
    (chatData, tempId) => ({
        chatData,
        tempId,
    }),
);