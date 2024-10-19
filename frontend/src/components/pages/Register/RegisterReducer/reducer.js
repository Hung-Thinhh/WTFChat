const { SET_INPUT, SHOW_PASS, SET_ERROR, SET_LOADING } = require('./action');

export const initState = {
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
};

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_INPUT:
            const { key, value } = action.payload;
            return {
                ...state,
                input: {
                    ...state.input,
                    [key]: value,
                },
            };
        case SHOW_PASS:
            return {
                ...state,
                showPass: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                err: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            throw new Error('Thay đổi không hợp lệ');
    }
};
