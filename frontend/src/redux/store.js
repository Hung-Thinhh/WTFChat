import { configureStore } from '@reduxjs/toolkit';
import forgetPassSlice from 'components/pages/ForgerPass/forgetPassSlice';
import registerSlice from 'components/pages/Register/registerSlice';
import sidebarSlice from 'components/layout/ChatLayout/LeftSidebar/sidebarSlide';

const store = configureStore({
    reducer: {
        register: registerSlice,
        forgetPass: forgetPassSlice,
        sidebar: sidebarSlice,
    },
});

export default store;
