import React from 'react';
import {categoryTypeApi} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteCategory, getCategories} from "../../store/FinanceThunks";
import {FinanceSelect, OpenEditModalCategory, setEditingCategory} from "../../store/FinanceSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
    categories: categoryTypeApi[]
}

const CategoryList: React.FC<Props> = ({categories}) => {

    const dispatch = useAppDispatch();

    const status = useAppSelector(FinanceSelect).status;

    return (
        <div>
            {categories.map(item => {
                return <div key={Math.random()} className='border border-2 border-dark rounded mt-2 p-3'>
                    <div className='d-flex'>
                        <div className='d-flex justify-content-between w-75'>
                            <p>{item.name} </p>
                            <p style={item.type === 'Income' ? {color: 'green'} : {color: 'red'}}>{item.type}</p>
                        </div>
                        <div>
                            <button disabled={status.deleting} className='btn btn-dark ms-2' onClick={async () => {
                                await dispatch(setEditingCategory(item));
                                await dispatch(OpenEditModalCategory());
                            }}>Edit
                            </button>
                            <button className='btn btn-dark ms-2' onClick={async () => {
                                if (window.confirm('Are you want Delete?')) {
                                    await dispatch(deleteCategory(item.id))
                                }
                                await dispatch(getCategories());
                            }}> {status.deleting ? <ButtonSpinner/> : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
};

export default CategoryList;