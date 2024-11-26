import { configureStore } from '@reduxjs/toolkit';
import forgetPassSlice from 'components/pages/ForgerPass/forgetPassSlice';
import registerSlice from 'components/pages/Register/registerSlice';
import sidebarSlice from 'components/layout/ChatLayout/LeftSidebar/sidebarSlide';
import reportTypeSlice from './reportType_Slide';
import notifySlice from './notifySlide';
import chatRoomSlice from './chatRoomSlice';

const store = configureStore({
    reducer: {
        register: registerSlice,
        forgetPass: forgetPassSlice,
        sidebar: sidebarSlice,
        typeReport: reportTypeSlice,
        chatRoom: chatRoomSlice,
        notify: notifySlice,
    },
});

export default store;
