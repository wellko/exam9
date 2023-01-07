import React, {useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {categoryType} from "../../types";
import {AddCategory, getCategories} from "../../store/FinanceThunks";
import {CloseAddModalCategory, CloseEditModalCategory} from "../../store/FinanceSlice";

const ModalCategory = () => {

    const dispatch = useAppDispatch();

    const initialState: categoryType = {
        name: '',
        type: 'Income',
    }

    const [category, setCategory] = useState<categoryType>(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    };

    const onClose = () => {
        dispatch(CloseAddModalCategory());
        dispatch(CloseEditModalCategory());
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(AddCategory(category));
        // await dispatch(CloseEditModal());
        await dispatch(getCategories());
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
                            <form id='edit' onSubmit={onSubmit}>
                                <label>Type</label>
                                <select value={category.type} name='type' onChange={onChange}>
                                    <option value='Expense'>Expense</option>
                                    <option value='Income'>Income</option>
                                </select>
                                <label>Category</label>
                                <input name='name' value={category.name} onChange={onChange} required={true}></input>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type='submit' form='edit'>Add</button>
                            <button type='button' onClick={onClose}> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCategory;