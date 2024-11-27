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
       
        editChatRooms: (state, action) => {
            const  {id,isBan}  = action.payload;
            const updatedRooms = state.rooms.map(room => (room.id === parseInt(id) ? {...room, status: isBan?1:0} : room  ));
            state.rooms = updatedRooms;
        },
    }

});

export const { setChatRooms, removeChatRoom,editChatRooms } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;