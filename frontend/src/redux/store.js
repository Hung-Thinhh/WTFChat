import { configureStore } from '@reduxjs/toolkit';
import forgetPassSlice from 'components/pages/ForgerPass/forgetPassSlice';
import registerSlice from 'components/pages/Register/registerSlice';
import sidebarSlice from 'components/layout/ChatLayout/LeftSidebar/sidebarSlide';
import reportTypeSlice from './globalSlice/reportType_Slide';
import chatRoomSlice from './globalSlice/chatRoomSlice';
import notifySlice from './notifySlide';
import profileSlice from 'components/pages/Profile/profileSlice';
import userSlice from './globalSlice/userSlice';
import chatSlide from 'components/pages/Chat/chatSlide';
const store = configureStore({
    reducer: {
        register: registerSlice,
        forgetPass: forgetPassSlice,
        sidebar: sidebarSlice,
        typeReport: reportTypeSlice,
        chatRoom: chatRoomSlice,
        profile: profileSlice,
        user: userSlice,
        notify: notifySlice,
        chatdata: chatSlide,
    },
});

export default store;
