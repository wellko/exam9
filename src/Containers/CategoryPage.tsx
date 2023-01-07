import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {FinanceSelect, OpenAddModalCategory} from "../store/FinanceSlice";
import ModalAction from "../Components/ModalAction/ModalAction";
import CategoryList from "../Components/CategoryList/CategoryList";
import {getCategories} from "../store/FinanceThunks";
import Spinner from "../Components/Spinner/Spinner";
import ModalCategory from "../Components/ModalCategory/ModalCategory";

const CategoryPage = () => {

    const dispatch = useAppDispatch();

    const modalAddCategory = useAppSelector(FinanceSelect).addModalCategory;

    const modalAddAction = useAppSelector(FinanceSelect).addModalAction;

    const categories = useAppSelector(FinanceSelect).categories;

    const status = useAppSelector(FinanceSelect).status;

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <>
            {modalAddAction ? <ModalAction categories={categories}/> : ''}
            {modalAddCategory ? <ModalCategory/> : ''}
            <div className='container'>
                <h1>Categories:</h1>

                <button className='btn btn-dark' onClick={() => dispatch(OpenAddModalCategory())}>Add</button>

                {status.getCategories ? <Spinner/> : <CategoryList categories={categories}/>}

            </div>
        </>
    );
};

export default CategoryPage;