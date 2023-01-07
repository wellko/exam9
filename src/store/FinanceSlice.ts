import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {AddCategory, addFinanceAction, deleteAction, deleteCategory, getActions, getCategories} from "./FinanceThunks";
import {categoryActionApi, categoryTypeAdd, categoryTypeApi} from "../types";

interface State {
    categories: categoryTypeApi[];
    actions: categoryActionApi[];
    addModalAction: boolean;
    editModalAction: boolean;
    addModalCategory: boolean;
    editModalCategory: boolean;
    editingAction?: categoryTypeAdd;
    editingCategory?: categoryTypeApi;
    status: {
        getCategories: boolean;
        getActions: boolean;
        deleting: boolean;
        editing: boolean;
    }
}

const initialState: State = {
    categories: [],
    actions: [],
    addModalAction: false,
    editModalAction: false,
    addModalCategory: false,
    editModalCategory: false,
    status: {
        deleting: false,
        getCategories: true,
        getActions: false,
        editing: false,
    }
};

const FinanceSlice = createSlice({
        name: 'finance',
        initialState,
        reducers: {
            OpenAddModalAction: state => {
                state.addModalAction = true;
            },
            CloseAddModalAction: state => {
                state.addModalAction = false;
            },
            OpenAddModalCategory: state => {
                state.addModalCategory = true;
            },
            CloseAddModalCategory: state => {
                state.addModalCategory = false;
            },
            OpenEditModalAction: state => {
                state.editModalAction = true;
            },
            CloseEditModalAction: state => {
                state.editModalAction = false;
            },
            OpenEditModalCategory: state => {
                state.editModalCategory = true;
            },
            CloseEditModalCategory: state => {
                state.editModalCategory = false;
            },
            setEditingAction: (state, {payload: item}: PayloadAction<categoryTypeAdd>) => {
                state.editingAction = item;
            },
            setEditingCategory: (state, {payload: item}: PayloadAction<categoryTypeApi>) => {
                state.editingCategory = item;
            },
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
                state.actions = [];
            })

            builder.addCase(getActions.pending, state => {
                state.status.getCategories = true;
            })
            builder.addCase(getActions.fulfilled, (state, action) => {
                state.actions = action.payload;
                state.status.getCategories = false;
            })
            builder.addCase(getActions.rejected, (state) => {
                state.status.getCategories = false;
                state.actions = [];
            })

            builder.addCase(deleteCategory.pending, (state) => {
                state.status.deleting = true;
            })
            builder.addCase(deleteCategory.fulfilled, (state) => {
                state.status.deleting = false;
            })
            builder.addCase(deleteCategory.rejected, (state) => {
                state.status.deleting = false;
            })

            builder.addCase(deleteAction.pending, (state) => {
                state.status.deleting = true;
            })
            builder.addCase(deleteAction.fulfilled, (state) => {
                state.status.deleting = false;
            })
            builder.addCase(deleteAction.rejected, (state) => {
                state.status.deleting = false;
            })

            builder.addCase(addFinanceAction.pending, state => {
                state.status.editing = true;
            })
            builder.addCase(addFinanceAction.fulfilled, (state) => {
                state.status.editing = false;
            })
            builder.addCase(addFinanceAction.rejected, (state) => {
                state.status.editing = false;
            })

            builder.addCase(AddCategory.pending, state => {
                state.status.editing = true;
            })
            builder.addCase(AddCategory.fulfilled, (state) => {
                state.status.editing = false;
            })
            builder.addCase(AddCategory.rejected, (state) => {
                state.status.editing = false;
            })
        }
    }
)

export const FinanceReducer = FinanceSlice.reducer;
export const FinanceSelect = (state: RootState) => state.finance;
export const {
    OpenAddModalAction, CloseAddModalAction, OpenEditModalAction, CloseEditModalAction, CloseEditModalCategory,
    OpenAddModalCategory, OpenEditModalCategory, CloseAddModalCategory, setEditingCategory, setEditingAction
} = FinanceSlice.actions;