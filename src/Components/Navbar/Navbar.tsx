import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {OpenAddModalAction} from "../../store/FinanceSlice";

const Navbar = () => {

    const dispatch = useAppDispatch();

    const onModal = () => {
        dispatch(OpenAddModalAction());
    }

    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className='container'>
                <Link to='/' className="navbar-brand">Finance Tracker</Link>
                <ul className="navbar-nav">
                    <li className='nav-item'>
                        <button onClick={() => navigate('/categories')} type='button'
                                className='btn btn-light  shadow shadow-lg me-2'>Categories
                        </button>
                        <button onClick={onModal} type='button' className='btn btn-light  shadow shadow-lg'>Add
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;