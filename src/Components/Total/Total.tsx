import React from 'react';
import {categoryAction} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {FinanceSelect} from "../../store/FinanceSlice";

interface Props {
    item: categoryAction[];
}

const Total: React.FC<Props> = ({item}) => {

    const categories = useAppSelector(FinanceSelect).categories;

    let Total = 0;

    if (item.length > 0) {
        item.map(item => {
                const index = categories.findIndex(element => element.id === item.category);
                if (index !== -1) {
                    if (categories[index].type === 'Income') {
                        Total += item.amount
                    } else {
                        Total -= item.amount
                    }
                }
                return Total
            }
        )
    }


    return (
        <div className='border border-3 shadow-lg w-50 pt-4 pb-4 mb-3 text-center'>
            Total :{Total} KGS
        </div>
    );
};

export default Total;