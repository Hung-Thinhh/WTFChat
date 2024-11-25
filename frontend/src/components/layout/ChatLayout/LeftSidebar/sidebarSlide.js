import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        showMenu: true,
        offset: 0,
        newMessage: {}
    },
    reducers: {
        setShowMenu: (state, action) => {
            state.showMenu = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },        
        setNewMessage: (state, action) => {
            state.newMessage = action.payload;
        }
    },
});

export const {setShowMenu,setOffset,setNewMessage} = sidebarSlice.actions;

export default sidebarSlice.reducer;
