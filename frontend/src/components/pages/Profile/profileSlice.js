import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from 'controller/authen';
import { getUserInfo } from 'controller/profile';

const fetchLogout = async () => {
    // logout
    const logoutRes = await logout();

    if (logoutRes.EC === '200') {
        window.location.reload();
    } else if (logoutRes.EC === '500') {
        alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
    }
};

export const fetchUser = createAsyncThunk('profile/fetchUser', async () => {
    const response = await getUserInfo();
    if (response.EC === '200') {
        const { avatar, birthdate, email, firstname, lastname, gender } = response.DT;

        const dateObject = new Date(birthdate);
        const formatBirthdate = dateObject.toLocaleDateString('en-CA');
        const newInput = {
            email,
            username: firstname + ' ' + lastname,
            birthdate: formatBirthdate,
            gender,
            avatar,
        };
        return newInput;
    } else if (response.EC === '400') {
        alert('Tài khoản đang bị khoá');
        await fetchLogout();
    } else if (response.EC === '403') {
        alert('Xác thực thất bại');
        await fetchLogout();
    } else if (response.EC === '500') {
        alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
    }
    return response;
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        initInput: {
            email: '',
            username: '',
            birthdate: '',
            gender: 0,
            avatar: '',
        },
        input: {
            email: '',
            username: '',
            birthdate: '',
            gender: 0,
            avatar: '',
        },
        err: '',
        loading: false,
    },
    reducers: {
        setInitInput: (state, action) => {
            state.initInput = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setError: (state, action) => {
            state.err = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.initInput = action.payload || state.initInput;
                state.input = action.payload || state.input;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            });
    },
});

export const { setInitInput, setInput, setError, setLoading } = profileSlice.actions;

export default profileSlice.reducer;
