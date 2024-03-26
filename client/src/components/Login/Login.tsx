import React from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import api from "@/service/api";
import CSS from "./Login.module.css";

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [recoverPasswordEmail, setRecoverPasswordEmail] = useState("");
    const [page, setPage] = useState("login");
    const router = useRouter();

    return (
        <div className={CSS.Login}>
            <div className={CSS.Login_container}>
                {page === "login" ? (
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
                            </div>
                            <div className={CSS.Login_containerFormAlignInputs}>
                                <button type="submit" className={CSS.Login_containerFormButton}>
                                    Enviar
                                </button>
                            </div>
                            <div className={CSS.Login_containerRecover}>
                                <p onClick={() => setPage("recover")} >Recuperar senha?</p>
                            </div>
                        </form>
                    </>
                ) : page === "recover" ? (
                    <>
                        <div className={CSS.Login_containerTitle}>
                            <h1>Recuperar Senha</h1>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            api.post("/auth/recover", {
                                email: recoverPasswordEmail,
                            })
                        }} className={CSS.Login_containerForm}>
                            <div className={CSS.Login_containerFormAlignInputs}>
                                <label className={CSS.Login_containerFormLabel}>
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) => {
                                        setRecoverPasswordEmail(e.target.value)
                                    }}
                                    className={CSS.Login_containerFormInput}
                                />
                            </div>
                            <div className={CSS.Login_containerFormAlignInputs}>
                                <button type="submit" className={CSS.Login_containerFormButton}>
                                    Enviar
                                </button>
                            </div>
                            <div className={CSS.Login_containerRecover}>
                                <p onClick={() => setPage("login")} >Voltar?</p>
                            </div>
                        </form>
                    </>
                ) : <></>}
            </div>
            <ToastContainer position="top-center" />
        </div >
    );
};

export default Login;
