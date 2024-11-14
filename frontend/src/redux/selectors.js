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
