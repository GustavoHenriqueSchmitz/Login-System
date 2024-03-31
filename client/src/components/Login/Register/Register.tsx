import api from '@/service/api';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import CSS from './Register.module.css';

function Register(props: any) {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const router = useRouter();

    return (
        <>
            <div className={CSS.Register_containerTitle}>
                <h1>Registre-se</h1>
            </div>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const results = await api.post("/user/register", {
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password
                })

                if (results.status !== 201) {
                    toast.error("Houve um erro ao tentar registrar usuário")
                } else {
                    toast.success("Usuário criado!")
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500)
                }
            }} className={CSS.Register_containerForm}>
                <div className={CSS.Register_containerFormAlignInputs}>
                    <label className={CSS.Register_containerFormLabel}>
                        Name:
                    </label>
                    <input
                        name="name"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))
                        }}
                        className={CSS.Register_containerFormInput}
                    />
                </div>
                <div className={CSS.Register_containerFormAlignInputs}>
                    <label className={CSS.Register_containerFormLabel}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))
                        }}
                        className={CSS.Register_containerFormInput}
                    />
                </div>
                <div className={CSS.Register_containerFormAlignInputs}>
                    <label className={CSS.Register_containerFormLabel}>
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))
                        }}
                        className={CSS.Register_containerFormInput}
                    />
                </div>
                <div className={CSS.Register_containerFormAlignInputs}>
                    <button type="submit" className={CSS.Register_containerFormButton}>
                        Enviar
                    </button>
                </div>
                <div className={CSS.Register_containerRecover}>
                    <p onClick={() => props.setPage("login")} >Voltar?</p>
                </div>
            </form>
        </>
    )
}

export default Register;
