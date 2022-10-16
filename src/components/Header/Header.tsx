import React, {FC, useState} from 'react';
import s from './Header.module.css'
import firebase from "firebase/compat/app";
import Enter from "../EnterForm/Enter";
import {auth} from "../../firebase/firebase";

interface HProps {
    user: firebase.User | null,
}

const handleLoginGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(provider)
    } catch (error) {
        alert(`Oops, something went wrong\n${error}`)
    }
}
const loginEmail = async (email: string, password: string) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        alert(`Oops, something went wrong\n${error}`)
    }
}
const registrationEmail = async (email: string, password: string) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
        alert(`Oops, something went wrong\n${error}`)
    }
}
const signOut = async () => {
    await auth.signOut();
}

const Header: FC<HProps> = ({user}) => {
    const [isActive, setIsActive] = useState(false)

    return <div style={{marginBottom: '2rem'}}>
        <div className={s.header}>
            {user
                ? <div className={s.userPart}>
                    Hello, {user.displayName ? user.displayName : user.email?.split('@')[0]}!
                </div>
                : <div className={s.userPart}>Hello!</div>}
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