import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkaccount, logout } from 'controller/authen';
import { socket } from 'socket';
export const fetchLogout = createAsyncThunk('user/logout', async () => {
    // logout
    const logoutRes = await logout();

    if (logoutRes.EC === '200') {
        return true;
    } else if (logoutRes.EC === '500') {
        alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
    }
});

export const fetchCurrUser = createAsyncThunk('user/getCurrUser', async () => {
    const res = await checkaccount();
    if (res.EC === '200') {
        socket.emit('authenticate', res.DT.id);
        return res.DT;
    } else if (res.EC === '400') {
        alert('Tài khoản đang bị khoá');
        fetchLogout();
    } else if (res.EC === '403') {
        alert('Xác thực thất bại');
        fetchLogout();
    } else if (res.EC === '500') {
        alert('Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com');
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currUser: null,
        checkAccount: false,
    },
    reducers: {
        setCurrUser: (state, action) => {
            state.currUser = action.payload;
        },
        setCheckAccount: (state, action) => {
            state.checkAccount = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchCurrUser.fulfilled, (state, action) => {
                state.currUser = action.payload || null;
                state.checkAccount = true;
            })
            .addCase(fetchCurrUser.rejected, (state, action) => {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.currUser = action.payload && null;
                // state.checkAccount = false;
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                alert(
                    'Lỗi hệ thống vui lòng báo cáo với chúng tôi! qua email: deptraivkl@gmail.com',
                );
            });
    },
});

export const { setCurrUser, setCheckAccount, setListStatus } = userSlice.actions;

export default userSlice.reducer;
