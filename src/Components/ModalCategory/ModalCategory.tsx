import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {categoryType, categoryTypeApi} from "../../types";
import {AddCategory, EditCategory, getCategories} from "../../store/FinanceThunks";
import {CloseAddModalCategory, CloseEditModalCategory, FinanceSelect} from "../../store/FinanceSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    item?: categoryTypeApi;
}

const ModalCategory: React.FC<Props> = ({item}) => {

    const dispatch = useAppDispatch();

    const state = useAppSelector(FinanceSelect).status.editing;

    let initialState: categoryType = {
        name: '',
        type: 'Income',
    }

    if (item) {
        initialState = {
            name: item.name,
            type: item.type
        }
    }

    const [category, setCategory] = useState<categoryType>(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCategory(prev => ({...prev, [name]: value}));
    };

    const onClose = () => {
        if (item) {
            dispatch(CloseEditModalCategory());
        } else {
            dispatch(CloseAddModalCategory());
        }


    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!item) {
            await dispatch(AddCategory(category));
            await dispatch(CloseAddModalCategory());
        } else {
            await dispatch(EditCategory({id: item.id, item: category}));
            await dispatch(CloseEditModalCategory());
        }

        await dispatch(getCategories());
    }

    return (
        <>
            <div className='modal-backdrop show'></div>
            <div className="modal fade show position-absolute" tabIndex={-1} style={{display: "block"}} role='dialog'>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex ">
                            <h5 className="modal-title">{item ? 'Edit Category' : 'Add Category'}</h5>
                            <button type="button" className="btn btn-secondary ms-auto" onClick={onClose}>X</button>
                        </div>
                        <div className="modal-body">
                            <form id='edit' onSubmit={onSubmit}>
                                <div className='row'>
                                    <label>Type</label>
                                    <select value={category.type} name='type' onChange={onChange}>
                                        <option value='Expense'>Expense</option>
                                        <option value='Income'>Income</option>
                                    </select>
                                    <label>Category</label>
                                    <input name='name' value={category.name} onChange={onChange}
                                           required={true}></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-dark' type='submit' form='edit'>{state ?
                                <ButtonSpinner/> : item ? 'Edit' : 'Add'}</button>
                            <button className='btn btn-dark' type='button' onClick={onClose}> Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCategory;