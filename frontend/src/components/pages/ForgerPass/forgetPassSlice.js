import { createSlice } from '@reduxjs/toolkit';

export const forgetPassSlice = createSlice({
    name: 'forgetPass',
    initialState: {
        input: {
            email: '',
            password: '',
            repass: '',
        },
        showPass: false,
        err: '',
        loading: false,
        otp: Array(6).fill(''),
        searchUser: '',
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
        setSearchUser: (state, action) => {
            state.searchUser = action.payload;
        },
    },
});

export const { setInput, showPass, setError, setLoading, setOTP, setSearchUser } =
    forgetPassSlice.actions;

export default forgetPassSlice.reducer;
