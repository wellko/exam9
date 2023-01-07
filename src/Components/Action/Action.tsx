import React from 'react';
import {categoryTypeApi} from "../../types";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteAction, getActions, getCategories} from "../../store/FinanceThunks";
import {
    FinanceSelect,
    OpenEditModalAction,
    setEditingAction,
} from "../../store/FinanceSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    item: categoryTypeApi;
    amount: number;
    date: string;
    id: string;
    idProp?: string;
}

const Action: React.FC<Props> = ({item, date, amount, id}) => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(FinanceSelect).status;

    let color = {color: 'white'}

    let char = '';

    switch (item.type) {
        case 'Expense' :
            color = {color: 'red'};
            char = "-";
            break;
        case  'Income':
            color = {color: 'green'}
            char = '+';
    }

    const onDelete = async () => {
        if (window.confirm('Are you want Delete?')) {
            await dispatch(deleteAction(id))
        }
        await dispatch(getActions());
        await dispatch(getCategories());
    }

    const amountString = amount.toString();

    return (
        <div className='border border-2 rounded row justify-content-between'>
            <div className='col-6'>
                <p>Date : {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</p>
                <p style={color}>{char}{amount} KGS</p>
                <p>{item.name}</p>
            </div>
            <div className='col-3'>
                <button disabled={status.deleting} className='btn btn-dark ms-2' onClick={async () => {
                    await dispatch(setEditingAction({
                        name: item.id,
                        amount: amountString,
                        type: item.type,
                        id: id,
                    }));
                    await dispatch(OpenEditModalAction());
                }}>Edit
                </button>
                <button className='btn btn-dark ms-2' onClick={onDelete}>{status.deleting ?
                    <ButtonSpinner/> : 'Delete'}</button>
            </div>
        </div>
    );
};

export default Action;