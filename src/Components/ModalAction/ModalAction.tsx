import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {categoryAction, categoryTypeAdd, categoryTypeApi} from "../../types";
import {addFinanceAction, EditAction, getActions} from "../../store/FinanceThunks";
import {CloseAddModalAction, CloseEditModalAction, FinanceSelect} from "../../store/FinanceSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    categories: categoryTypeApi[];
    editing?: categoryTypeAdd;
}

const ModalAction: React.FC<Props> = ({categories, editing}) => {

    const state = useAppSelector(FinanceSelect).status.editing;

    let initialState: categoryTypeAdd = {
        name: '',
        type: 'Expense',
        amount: '',
    }

    if (editing) {
        initialState = editing
    }

    const [sendData, setSendData] = useState<categoryTypeAdd>(initialState);

    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;
        setSendData(prev => ({...prev, [name]: value}));
    };

    const onClose = () => {
        if (editing) {
            dispatch(CloseEditModalAction());
        } else {
            dispatch(CloseAddModalAction());
        }
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
        if (editing) {
            await dispatch(EditAction({
                item: SendingItem,
                id: editing.id!,
            }))
            dispatch(CloseEditModalAction());
        } else {
            await dispatch(addFinanceAction(SendingItem));
            dispatch(CloseAddModalAction());
        }
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
                            <h5 className="modal-title">{editing ? 'Edit category' : "Add category"}</h5>
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
                                    <select onChange={onChange} name='name' required={true} defaultValue={sendData.name}
                                            value={sendData.name}>
                                        <option
                                            value=''>{editing ? 'Click if you want change' : 'Enter any category'}</option>
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
                            <button type='submit' form='add'> {state ?
                                <ButtonSpinner/> : editing ? 'Edit' : 'Add'} </button>
                            <button type='button' onClick={onClose}> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAction;