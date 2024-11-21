import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        showMenu: false,
    },
    reducers: {
        setShowMenu: (state, action) => {
            state.showMenu = action.payload;
        },
    },
});

export const {setShowMenu} = sidebarSlice.actions;

export default sidebarSlice.reducer;
