import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import api from "@/service/api";
import CSS from './Login.module.css';

function Login(props: any) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    return (
        <>
            <div className={CSS.Login_containerTitle}>
                <h1>Sistema de Login</h1>
            </div>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const results = await api.post("/auth/login", {
                    email: loginData.email,
                    password: loginData.password
                })

                if (results.status === 401) {
                    toast.error("Login ou senha errados")
                } else if (results.status !== 200) {
                    toast.error("Houve um erro ao fazer login, tente novamente")
                } else {
                    localStorage.setItem('token', results.data.data);
                    router.push('/home');
                }
            }} className={CSS.Login_containerForm}>
                <div className={CSS.Login_containerFormAlignInputs}>
                    <label className={CSS.Login_containerFormLabel}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                            setLoginData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))
                        }}
                        className={CSS.Login_containerFormInput}
                    />
                </div>
                <div className={CSS.Login_containerFormAlignInputs}>
                    <label className={CSS.Login_containerFormLabel}>
                        Senha:
                    </label>
                    <input
                        type="password"
                        name="password"
                        className={CSS.Login_containerFormInput}
                        onChange={(e) => {
                            setLoginData((prevData) => ({
                                ...prevData,
                                [e.target.name]: e.target.value
                            }))
                        }}
                    />
                    <p onClick={() => props.setPage("recover")} >Recuperar senha?</p>
                </div>
                <div className={CSS.Login_containerFormAlignInputs}>
                    <button type="submit" className={CSS.Login_containerFormButton}>
                        Login
                    </button>
                </div>
                <div className={CSS.Login_containerRecover}>
                    <p onClick={() => props.setPage("register")}>Não têm uma conta?</p>
                </div>
            </form>
        </>
    )
}

export default Login;
