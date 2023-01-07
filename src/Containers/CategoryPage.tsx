import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {FinanceSelect, OpenEditModal} from "../store/FinanceSlice";
import ModalAdd from "../Components/ModalAdd/ModalAdd";
import ModalEdit from "../Components/ModalEdit/ModalEdit";
import CategoryList from "../Components/CategoryList/CategoryList";
import {getCategories} from "../store/FinanceThunks";
import Spinner from "../Components/Spinner/Spinner";

const CategoryPage = () => {

    const dispatch = useAppDispatch();

    const modalAdd = useAppSelector(FinanceSelect).addModal;

    const modalEdit = useAppSelector(FinanceSelect).editModal;

    const categories = useAppSelector(FinanceSelect).categories;

    const status = useAppSelector(FinanceSelect).status;

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <>
            {modalAdd ? <ModalAdd categories={categories}/> : ''}
            {modalEdit ? <ModalEdit/> : ''}
            <div className='container'>
                <h1>Categories:</h1>

                <button className='btn btn-dark' onClick={() => dispatch(OpenEditModal())}>Add</button>

                {status.getCategories ? <Spinner/> : <CategoryList categories={categories}/>}

            </div>
        </>
    );
};

export default CategoryPage;