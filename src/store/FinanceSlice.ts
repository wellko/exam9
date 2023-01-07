import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface State {
    addModal: boolean;
    editModal: boolean;
}

const initialState: State = {
    addModal: false,
    editModal: false,
};

const FinanceSlice = createSlice({
        name: 'finance',
        initialState,
        reducers:{
            OpenAddModal: state => {
                state.addModal = true;
            },
            CloseAddModal: state => {
                state.addModal = false;
            },
            OpenEditModal: state => {
                state.editModal = true;
            },
            CloseEditModal: state => {
                state.editModal = false;
            }
        },
    }
)

export const FinanceReducer = FinanceSlice.reducer;
export const FinanceSelect = (state: RootState) => state.finance;
export const {OpenAddModal, CloseAddModal, OpenEditModal, CloseEditModal} = FinanceSlice.actions;