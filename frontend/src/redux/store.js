import { configureStore } from '@reduxjs/toolkit';
import registerSlice from 'components/pages/Register/registerSlice';

const store = configureStore({
    reducer: {
        register: registerSlice,
    },
});

export default store;
