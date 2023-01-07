import {configureStore} from "@reduxjs/toolkit";
import {FinanceReducer} from "../store/FinanceSlice";


export const store = configureStore({
    reducer: {
        finance: FinanceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;