import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slide/themeSlice";
import AuthenticationReducer from "./slide/AuthenticationSlice";

export const store = configureStore({
    reducer: {
        Authentication: AuthenticationReducer,
        theme:themeReducer
    },
});
