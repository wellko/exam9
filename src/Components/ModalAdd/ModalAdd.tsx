import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {CloseAddModal} from "../../store/FinanceSlice";
import {categoryAction, categoryTypeAdd, categoryTypeApi} from "../../types";
import {addFinanceAction, getActions} from "../../store/FinanceThunks";

interface Props {
    categories: categoryTypeApi[]
}

const ModalAdd: React.FC<Props> = ({categories}) => {

    const initialState: categoryTypeAdd = {
        name: '',
        type: 'Expense',
        amount: '',
    }

    const [sendData, setSendData] = useState<categoryTypeAdd>(initialState);

    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setSendData(prev => ({...prev, [name]: value}));
    };
    const onClose = () => {
        dispatch(CloseAddModal());
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date();
        const createdAt = now.toISOString();
        const SendingItem: categoryAction = {
            amount: parseInt(sendData.amount),
            category: sendData.name,
            createdAt: createdAt,
        };
        await dispatch(addFinanceAction(SendingItem));
        await dispatch(CloseAddModal());
        await dispatch(getActions());
    }

    const options = categories.filter(item => item.type === sendData.type)

    return (
        <>
            <div className='modal-backdrop show'></div>
            <div className="modal fade show position-absolute" tabIndex={-1} style={{display: "block"}} role='dialog'>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex ">
                            <h5 className="modal-title">Add category</h5>
                            <button type="button" className="btn btn-secondary ms-auto" onClick={onClose}>X</button>
                        </div>
                        <div className="modal-body">
                            <form id='add' onSubmit={onSubmit}>
                                <div className='row'>
                                    <label>Type</label>
                                    <select onChange={onChange} name='type' value={sendData.type}>
                                        <option defaultChecked={true} value='Expense'>Expense</option>
                                        <option value='Income'>Income</option>
                                    </select>
                                    <label>Category</label>
                                    <select onChange={onChange} name='name' required={true} value={sendData.name}>
                                        <option value=''>Enter any category</option>
                                        {options.map(item => <option key={Math.random()}
                                                                     value={item.id}>{item.name}</option>)}
                                    </select>
                                    <label>amount</label>
                                    <input onChange={onChange} value={sendData.amount} name='amount' type='text'
                                           required={true} pattern='[0-9]*$'/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type='submit' form='add'>Add</button>
                            <button type='button' onClick={onClose}> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAdd;