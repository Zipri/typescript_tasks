import React, {FC, useState} from 'react';
import s from './Enter.module.css'

interface EProps {
    handleLoginGoogle: () => Promise<void>,
}

const Enter: FC<EProps> = ({handleLoginGoogle}) => {
    const [loginMail, setLoginMail] = useState<string>('')
    const [loginPassword, setLoginPassword] = useState<string>('')
    const [registryMail, setRegistryMail] = useState<string>('')
    const [registryPassword, setRegistryPassword] = useState<string>('')

    const signUp = () => {
        if (!loginMail.trim() && loginPassword.length >= 6) {
            alert(`${loginMail} ||| ${loginPassword}`)
        } else {
            alert("wrong E-mail or password")
        }
    }

    return <div className={s.enterBody}>
        <div className={s.formDiv}>
            <div>
                <input value={loginMail}
                       onChange={(e) => setLoginMail(e.target.value)}
                       placeholder={"E-mail"}
                       type="text"
                       className={s.inputFrom}/>
                <input value={loginPassword}
                       onChange={(e) => setLoginPassword(e.target.value)}
                       placeholder={"Password (min 6 symbols)"}
                       type="password"
                       className={s.inputFrom}/>
                <button className={s.button} onClick={() => {}}>
                    Sign in
                </button>
                <button className={s.button} onClick={signUp}>
                    Sign up
                </button>
            </div>
            <div>
                <button className={s.button} onClick={handleLoginGoogle}>
                    Sign in with Google account
                </button>
            </div>
        </div>
    </div>
};

export default Enter;