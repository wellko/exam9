import React, {useEffect} from 'react';
import ModalAction from "../../Components/ModalAction/ModalAction";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FinanceSelect} from "../../store/FinanceSlice";
import {getActions, getCategories} from "../../store/FinanceThunks";
import Action from "../../Components/Action/Action";
import Spinner from "../../Components/Spinner/Spinner";
import Total from "../../Components/Total/Total";

const HomePage = () => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(FinanceSelect).status;

    const modal = useAppSelector(FinanceSelect);

    const categories = useAppSelector(FinanceSelect).categories;

    const actions = useAppSelector(FinanceSelect).actions;

    const editing = useAppSelector(FinanceSelect).editingAction;

    useEffect(() => {
        dispatch(getActions());
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            {modal.addModalAction ? <ModalAction categories={categories}/> : ''}
            {modal.editModalAction ? <ModalAction categories={categories} editing={editing}/> : ''}
            <div className='container'>
                {status.getCategories ? <Spinner/> : <Total item={actions}/>}
                {status.getCategories ?
                    <Spinner/> : actions.length > 0 ? (actions.map(item => {
                        const data = categories.filter(category => category.id === item.category);
                        if (data.length > 0) {
                            return <Action id={item.id} key={Math.random()} amount={item.amount} item={data[0]}
                                           date={item.createdAt}/>
                        }
                        return '';
                    })) : <h2>No Actions Yet</h2>}
            </div>
        </>
    );
};

export default HomePage;