import React, {FC, useState} from 'react';
import s from './Header.module.css'
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import Enter from "../EnterForm/Enter";

interface HProps {
    user: firebase.User | null,
    signOut: () => Promise<void>,
    handleLoginGoogle: () => Promise<void>,
    loginEmail: (email: string, password: string) => Promise<void>,
    registrationEmail: (email: string, password: string) => Promise<void>
}

const Header: FC<HProps> = ({user, signOut, handleLoginGoogle, loginEmail, registrationEmail}) => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)

    return <div style={{marginBottom: '2rem'}}>
        <div className={s.header}>
            {user
                ? <div className={s.userPart}>
                    Hello, {user.displayName ? user.displayName : user.email?.split('@')[0]}!
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
                : <div className={s.button} onClick={() => setIsActive(!isActive)}>
                    {isActive? <div>Close form</div> : <div>Sign in</div>}
                </div>}
        </div>
        {isActive && <Enter handleLoginGoogle={handleLoginGoogle} loginEmail={loginEmail}
                            registrationEmail={registrationEmail} setIsActive={setIsActive}/>}
    </div>
};

export default Header;