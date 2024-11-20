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

export const showMenu1Selector = createSelector(
    showMenuSelector,
    (showMenu) => ({
        showMenu
    }),
);
