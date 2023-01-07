import React from 'react';
import {categoryTypeApi} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {deleteCategory, getCategories} from "../../store/FinanceThunks";
import {OpenEditModalCategory} from "../../store/FinanceSlice";

interface Props {
    categories: categoryTypeApi[]
}

const CategoryList: React.FC<Props> = ({categories}) => {

    const dispatch = useAppDispatch();

    return (
        <div>
            {categories.map(item => {
                return <div key={Math.random()} className='border border-2 border-dark rounded mt-2 p-3'>
                    <div className='d-flex'>
                    <div className='d-flex justify-content-between w-75'>
                        <p>{item.name} </p>
                        <p style={item.type === 'Income'? {color: 'green'} : {color : 'red'}}>{item.type}</p>
                    </div>
                        <div >
                            <button className='btn btn-dark ms-2' onClick={() => dispatch(OpenEditModalCategory()) }>Edit</button>
                            <button className='btn btn-dark ms-2' onClick={ async () => {
                               await dispatch(deleteCategory(item.id))
                               await dispatch(getCategories());
                            }}>Delete</button>
                        </div>
                </div>
                </div>
            })}
        </div>
    );
};

export default CategoryList;