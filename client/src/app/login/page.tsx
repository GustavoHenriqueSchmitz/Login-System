'use client';
import React from "react";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Login from "@/components/Login/Login/Login";
import CSS from "./page.module.css";
import PasswordRecover from "@/components/Login/PasswordRecover/PasswordRecover";
import Register from "@/components/Login/Register/Register";

function LoginPage() {
    const [page, setPage] = useState("login");

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
};

export default LoginPage;
