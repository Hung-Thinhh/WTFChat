import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        showMenu: false,
        offset: 0,
    },
    reducers: {
        setShowMenu: (state, action) => {
            state.showMenu = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        }
    },
});

export const {setShowMenu,setOffset} = sidebarSlice.actions;

export default sidebarSlice.reducer;
