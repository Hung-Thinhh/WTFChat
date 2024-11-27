import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatData: [], // Ensure chatData is initialized as an array
        tempId: null,
    },
    reducers: {
        setChatData: (state, action) => {
            state.chatData = action.payload;
        },
        addMessage: (state, action) => {
            state.chatData.push(action.payload);
        },
        updateMessage: (state, action) => {
            const index = state.chatData.findIndex(msg => msg.id === action.payload.id);
            if (index !== -1) {
                state.chatData[index] = action.payload;
            }
        },
        setTempId: (state, action) => {
            state.tempId = action.payload;
        },
    },
});

export const { setChatData, addMessage, updateMessage,setTempId } = chatSlice.actions;
export default chatSlice.reducer;