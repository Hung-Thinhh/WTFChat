export const SET_INPUT = 'setInput';
export const SHOW_PASS = 'showPass';
export const SET_ERROR = 'setError';
export const SET_LOADING = 'setLoading';
export const SET_OTP = 'setOtp';
export const SET_SEARCH_USER = 'setSearchUser';

export const setInput = (payload) => ({
    type: SET_INPUT,
    payload,
});

export const showPass = (payload) => ({
    type: SHOW_PASS,
    payload: !payload,
});

export const setError = (payload) => ({
    type: SET_ERROR,
    payload,
});

export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload,
});

export const setOTP = (payload) => ({
    type: SET_OTP,
    payload,
});

export const setSearchUser = (payload) => ({
    type: SET_SEARCH_USER,
    payload,
});
