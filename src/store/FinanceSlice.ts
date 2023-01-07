import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface State {}

const initialState: State = {};

const FinanceSlice = createSlice({
        name: 'finance',
        initialState,
        reducers:{},
    }
)

export const FinanceReducer = FinanceSlice.reducer;
export const FinanceSelect = (state: RootState) => state;