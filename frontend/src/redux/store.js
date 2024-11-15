import { configureStore } from '@reduxjs/toolkit';
import forgetPassSlice from 'components/pages/ForgerPass/forgetPassSlice';
import registerSlice from 'components/pages/Register/registerSlice';

const store = configureStore({
    reducer: {
        register: registerSlice,
        forgetPass: forgetPassSlice,
    },
});

export default store;
