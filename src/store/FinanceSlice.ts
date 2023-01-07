import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {deleteCategory, getActions, getCategories} from "./FinanceThunks";
import {categoryActionApi, categoryTypeApi} from "../types";

interface State {
    categories: categoryTypeApi[];
    actions: categoryActionApi[];
    addModal: boolean;
    editModal: boolean;
    status: {
        getCategories: boolean;
        getActions:boolean;
        deleteCategory: boolean;
    }
}

const initialState: State = {
    categories: [],
    actions: [],
    addModal: false,
    editModal: false,
    status: {
        deleteCategory:false,
        getCategories: true,
        getActions: false,
    }
};

const FinanceSlice = createSlice({
        name: 'finance',
        initialState,
        reducers: {
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
        extraReducers: (builder) => {
            builder.addCase(getCategories.pending, (state) => {
                state.status.getCategories = true;
            })
            builder.addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.status.getCategories = false;
            })
            builder.addCase(getCategories.rejected, (state) => {
                state.status.getCategories = false;
            })

            builder.addCase(getActions.pending, state => {
              state.status.getCategories = true;
            })
            builder.addCase(getActions.fulfilled, (state, action) => {
                state.actions = action.payload;
                state.status.getCategories = false;
            })
            builder.addCase(getActions.rejected, state => {
                state.status.getCategories = false;
            })

            builder.addCase(deleteCategory.pending, (state) => {
                state.status.deleteCategory = true;
            })
            builder.addCase(deleteCategory.fulfilled, (state) => {
                state.status.deleteCategory = false;
            })
            builder.addCase(deleteCategory.rejected, (state) => {
                state.status.deleteCategory = false;
            })
        }
    }
)

export const FinanceReducer = FinanceSlice.reducer;
export const FinanceSelect = (state: RootState) => state.finance;
export const {OpenAddModal, CloseAddModal, OpenEditModal, CloseEditModal} = FinanceSlice.actions;