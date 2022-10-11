import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import s from './Enter.module.css'

interface EProps {
    handleLoginGoogle: () => Promise<void>,
    loginEmail: (email: string, password: string) => Promise<void>,
    registrationEmail: (email: string, password: string) => Promise<void>,
    setIsActive: Dispatch<SetStateAction<boolean>>
}

const Enter: FC<EProps> = ({handleLoginGoogle, loginEmail, registrationEmail, setIsActive}) => {
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const signUp = () => {
        if (!mail.trim() && mail.includes(' ')) {
            alert("wrong E-mail")
        } else if (password.length < 6) {
            alert("password must be more than 6 symbols")
        } else {
            setIsActive(false)
            registrationEmail(mail, password)
        }
    }

    const signIn = () => {
        setIsActive(false)
        loginEmail(mail, password)
    }

    const signWithGoogle = () => {
        setIsActive(false)
        handleLoginGoogle()
    }

    return <div className={s.enterBody}>
        <div className={s.formDiv}>
            <div>
                <input value={mail}
                       onChange={(e) => setMail(e.target.value)}
                       placeholder={"E-mail"}
                       type="text"
                       className={s.inputFrom}/>
                <input value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder={"Password (min 6 symbols)"}
                       type="password"
                       className={s.inputFrom}/>
                <div className={s.signButtons}>
                    <button className={s.signIn} onClick={signIn}>
                        Sign in
                    </button>
                    <button onClick={signUp} className={s.button}>
                        Sign up
                    </button>
                </div>
            </div>
            <div>
                <button className={s.button} onClick={signWithGoogle}>
                    Sign in with Google account
                </button>
            </div>
        </div>
    </div>
};

export default Enter;