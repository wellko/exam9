import React from 'react';
import ModalAdd from "../../Components/ModalAdd/ModalAdd";
import {useAppSelector} from "../../app/hooks";
import {FinanceSelect} from "../../store/FinanceSlice";

const HomePage = () => {

    const modal = useAppSelector(FinanceSelect).addModal;

    return (
        <>
            {modal ? <ModalAdd/> : ''}
        <div className='container'>

            
        </div>
        </>
    );
};

export default HomePage;