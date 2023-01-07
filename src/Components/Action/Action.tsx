import React from 'react';
import {categoryTypeApi} from "../../types";
import dayjs from "dayjs";
import {useAppDispatch} from "../../app/hooks";
import {deleteAction} from "../../store/FinanceThunks";

interface Props {
    item: categoryTypeApi;
    amount: number;
    date: string;
    id: string;
}

const Action: React.FC<Props> = ({item, date, amount, id}) => {

    const dispatch = useAppDispatch();

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

    const onDelete = () => {
        if (window.confirm('Are you want Delete?')) {
            dispatch(deleteAction(id))
        }
    }

    return (
        <div className='border border-2 rounded row justify-content-between'>
            <div className='col-6'>
                <p>Date : {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</p>
                <p style={color}>{char}{amount} KGS</p>
                <p>{item.name}</p>
            </div>
            <div className='col-3'>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Action;