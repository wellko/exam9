import React from 'react';
import {useAppSelector} from "../app/hooks";
import {FinanceSelect} from "../store/FinanceSlice";
import ModalAdd from "../Components/ModalAdd/ModalAdd";

const CategoryPage = () => {

    const modalAdd = useAppSelector(FinanceSelect).addModal;

    const modalEdit = useAppSelector(FinanceSelect).editModal;
    return (
        <>
            {modalAdd? <ModalAdd/> : ''}
        <div className='container'>

        </div>
        </>
    );
};

export default CategoryPage;