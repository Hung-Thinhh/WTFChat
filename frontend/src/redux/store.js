import { configureStore } from '@reduxjs/toolkit';
import forgetPassSlice from 'components/pages/ForgerPass/forgetPassSlice';
import registerSlice from 'components/pages/Register/registerSlice';
import sidebarSlice from 'components/layout/ChatLayout/LeftSidebar/sidebarSlide';
import reportTypeSlice from './reportType_Slide';

const store = configureStore({
    reducer: {
        register: registerSlice,
        forgetPass: forgetPassSlice,
        sidebar: sidebarSlice,
        typeReport:reportTypeSlice
    },
});

export default store;
