import {createAsyncThunk} from "@reduxjs/toolkit";
import {categoryAction, categoryActionApi, categoryType, categoryTypeApi} from "../types";
import axiosApi from "../axios-api";

export const AddCategory = createAsyncThunk<void, categoryType>(
    'finance/addCategory',
    async (arg) => {
        await axiosApi.post('finance/categories.json', arg)
    }
)

export const getCategories = createAsyncThunk<categoryTypeApi[]>(
    'finance/get',
    async () => {
        const response =  await axiosApi.get('finance/categories.json');
        return Object.keys(response.data).map(key => {
            return {...response.data[key], id: key}
        })
    }
)

export const getActions = createAsyncThunk<categoryActionApi[]>(
    'finance/getAction',
    async () => {
        const response =  await axiosApi.get('finance/actions.json');
        return Object.keys(response.data).map(key => {
            return {...response.data[key], id: key}
        })
    }
)

export const deleteCategory = createAsyncThunk<void, string>(
    'finance/del',
    async (arg) => {
        await axiosApi.delete('finance/categories/' + arg + '.json')
    }
)

export const addFinanceAction = createAsyncThunk<void, categoryAction>(
    'finance/addAction',
    async (arg) => {
        await axiosApi.post('finance/actions.json', arg)
    }
)

export const deleteAction = createAsyncThunk<void, string>(
    'finance/deleteAction',
    async (arg) => {
        await axiosApi.delete('finance/actions/' + arg + '.json');
    }
)