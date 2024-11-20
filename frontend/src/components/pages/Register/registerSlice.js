import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        input: {
            email: '',
            username: '',
            password: '',
            repass: '',
            birthdate: '',
            gender: 0,
        },
        showPass: false,
        err: '',
        loading: false,
        otp: Array(6).fill(''),
    },
    reducers: {
        setInput: (state, action) => {
            const { key, value } = action.payload;

            state.input[key] = value;
        },
        showPass: (state, action) => {
            state.showPass = action.payload;
        },
        setError: (state, action) => {
            state.err = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOTP: (state, action) => {
            state.otp = action.payload;
        },
    },
});

export const { setInput, showPass, setError, setLoading, setOTP } = registerSlice.actions;

export default registerSlice.reducer;
