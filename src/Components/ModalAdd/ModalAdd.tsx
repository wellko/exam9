import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {CloseAddModal} from "../../store/FinanceSlice";

const ModalAdd = () => {

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
                            <form id='add'>
                                <label>Type</label>
                                <select>
                                    <option defaultChecked={true} value='Expense'>Expense</option>
                                    <option value='Income'>Income</option>
                                </select>

                                <label>Category</label>
                                <select required={true}>
                                </select>

                                <label>amount</label>
                                <input type='number' required={true} pattern='[0-9]*$'/>

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

export default ModalAdd;