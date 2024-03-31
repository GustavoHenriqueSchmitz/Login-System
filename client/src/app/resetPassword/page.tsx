'use client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import api from "@/service/api";
import CSS from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

function ResetPassword() {
    const [resetPasswordData, setResetPasswordData] = useState({
        password: "",
        passwordConfirm: ""
    });
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        const token: any = searchParams.get('token');
        localStorage.setItem("token", token);
    }, [searchParams])

    return (
        <div className={CSS.ResetPassword}>
            <div className={CSS.ResetPassword_container}>
                <div className={CSS.ResetPassword_containerHeader}>
                    <h1 className={CSS.ResetPassword_containerTitle}>Login</h1>
                </div>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                    const results = await api.post(`/auth/reset`, {
                        password: resetPasswordData.password,
                        passwordConfirm: resetPasswordData.passwordConfirm
                    })

                    if (resetPasswordData.password !== resetPasswordData.passwordConfirm) {
                        toast.error("Nova senha, não confere com a confirmação.")
                    } else if (results.status === 401) {
                        toast.error("Token de recuperação inválido, peça por outro email para recuperação.")
                        localStorage.removeItem("token");
                    }
                    else if (results.status !== 200) {
                        toast.error("Houve um erro ao resetar senha, tente novamente.")
                        localStorage.removeItem("token");
                    } else {
                        toast.success("Senha alterada com sucesso!")
                        localStorage.removeItem("token");
                        setTimeout(() => {
                            router.push("/login")
                        }, 1500)
                    }
                }} className={CSS.ResetPassword_containerForm}>
                    <div className={CSS.ResetPassword_containerFormAlignInputs}>
                        <label className={CSS.ResetPassword_containerFormLabel}>
                            Nova Senha:
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => {
                                setResetPasswordData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                            className={CSS.ResetPassword_containerFormInput}
                        />
                    </div>
                    <div className={CSS.ResetPassword_containerFormAlignInputs}>
                        <label className={CSS.ResetPassword_containerFormLabel}>
                            Confirmar nova senha:
                        </label>
                        <input
                            type="password"
                            name="passwordConfirm"
                            className={CSS.ResetPassword_containerFormInput}
                            onChange={(e) => {
                                setResetPasswordData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className={CSS.ResetPassword_containerFormAlignInputs}>
                        <button type="submit" className={CSS.ResetPassword_containerFormButton}>
                            Login
                        </button>
                    </div>
                    <div className={CSS.ResetPassword_containerRecover}>
                        <Link href={"/login"}>Voltar</Link>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default ResetPassword;
