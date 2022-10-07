import React, {FC} from 'react';
import s from './Header.module.css'
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";

interface HProps {
    user: firebase.User | null,
    signOut: () => Promise<void>,
    handleLoginGoogle: () => Promise<void>,
}

const Header: FC<HProps> = ({user, signOut, handleLoginGoogle}) => {
    const navigate = useNavigate()

    return <div className={s.header}>
        {user
            ? <div className={s.userPart}>
                Hello, {user?.displayName}!
            </div>
            : <div className={s.userPart}>Hello!</div>}
        <span className={s.divider}/>
        <div onClick={() => navigate('/users')} className={s.button}>
            USERS
        </div>
        <span className={s.divider}/>
        <div onClick={() => navigate('/tasks')} className={s.button}>
            TASKS
        </div>
        <span className={s.divider}/>
        {user
            ? <div className={s.button} onClick={signOut}>
                Exit
            </div>
            : <div className={s.button} onClick={handleLoginGoogle}>
                Sing in
            </div>}
    </div>
};

export default Header;