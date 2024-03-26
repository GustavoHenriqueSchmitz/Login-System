import api from '@/service/api';
import { useState } from 'react';
import CSS from './Password.module.css';

function PasswordRecover(props: any) {
    const [recoverPasswordEmail, setRecoverPasswordEmail] = useState("");

    return (
        <>
            <div className={CSS.PasswordRecover_containerTitle}>
                <h1>Recuperar Senha</h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                api.post("/auth/recover", {
                    email: recoverPasswordEmail,
                })
            }} className={CSS.PasswordRecover_containerForm}>
                <div className={CSS.PasswordRecover_containerFormAlignInputs}>
                    <label className={CSS.PasswordRecover_containerFormLabel}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setRecoverPasswordEmail(e.target.value)
                        }}
                        className={CSS.PasswordRecover_containerFormInput}
                    />
                </div>
                <div className={CSS.PasswordRecover_containerFormAlignInputs}>
                    <button type="submit" className={CSS.PasswordRecover_containerFormButton}>
                        Enviar
                    </button>
                </div>
                <div className={CSS.PasswordRecover_containerRecover}>
                    <p onClick={() => props.setPage("login")} >Voltar?</p>
                </div>
            </form>
        </>
    )
}

export default PasswordRecover;
