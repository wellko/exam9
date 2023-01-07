import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {CloseAddModal} from "../../store/FinanceSlice";
import {categoryType} from "../../types";

const ModalEdit = () => {

    const initialState: categoryType = {
        name: '',
        type: '',
    }

    const [category, setCategory] = useState<categoryType>(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    };

    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(CloseAddModal());
    }

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
                            <form id='edit'>
                                <label>Type</label>
                                <select onChange={onChange}>
                                    <option defaultChecked={true} value='Expense'>Expense</option>
                                    <option value='Income'>Income</option>
                                </select>

                                <label>Category</label>
                                <input  value={category.name} onChange={onChange} required={true}></input>

                            </form>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalEdit;