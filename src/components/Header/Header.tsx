import React from 'react';
import s from './Header.module.css'
import {useNavigate } from "react-router-dom";

const Header = () => {
    const navigate  = useNavigate ()
    return <div className={s.header}>
        <div onClick={() => navigate('/users')}>
            USERS
        </div>
        <span className={s.divider}/>
        <div onClick={() => navigate('/tasks')}>
            TASKS
        </div>
    </div>
};

export default Header;