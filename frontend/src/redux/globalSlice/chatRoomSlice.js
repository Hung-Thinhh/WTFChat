import { createSlice } from '@reduxjs/toolkit';

const chatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: {
        rooms: [],
    },
    reducers: {
        setChatRooms: (state, action) => {
            state.rooms = action.payload;
        },
        removeChatRoom: (state, action) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
        },
    },
});

export const { setChatRooms, removeChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;