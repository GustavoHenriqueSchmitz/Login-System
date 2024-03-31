'use client';
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Login from "@/components/Login/Login/Login";
import CSS from "./page.module.css";
import PasswordRecover from "@/components/Login/PasswordRecover/PasswordRecover";
import Register from "@/components/Login/Register/Register";
import useAuth from "@/service/auth";
import { useRouter } from 'next/navigation';

function LoginPage() {
    const [page, setPage] = useState("login");
    const { authenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authenticated) {
            router.push("/logged");
        }
    }, [authenticated, router])

    if (!authenticated && authenticated !== undefined) {
        return (
            <div className={CSS.Login}>
                <div className={CSS.Login_container}>
                    {page === "login" ? (
                        <Login
                            setPage={setPage}
                        />
                    ) : page === "recover" ? (
                        <PasswordRecover
                            setPage={setPage}
                        />
                    ) : page === "register" ? (
                        <Register
                            setPage={setPage}
                        />
                    ) : <></>}
                </div>
                <ToastContainer position="top-center" />
            </div >
        );
    }
};

export default LoginPage;
