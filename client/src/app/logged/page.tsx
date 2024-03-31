'use client';
import React, { useEffect, useState } from "react";
import CSS from "./page.module.css";
import useAuth from "@/service/auth";
import api from "@/service/api";
import { UserInformation } from "@/types/user/user.dto";
import Link from "next/link";

function Logged() {
    const [userInformation, setUserInformation] = useState<UserInformation>();
    const { authenticated, logout } = useAuth()

    const getUserInformation = async () => {
        const results = (await api.get("/user/getLoggedUserInfo")).data;
        setUserInformation(results.data);
    }

    useEffect(() => {
        getUserInformation()
    }, [])

    if (authenticated && authenticated !== undefined) {
        return (
            <div className={CSS.Logged}>
                <div className={CSS.Logged_Content}>
                    <h1>Olá {userInformation?.name}</h1>
                    <p>Obrigado por logar em nosso sistema! Seja bem vindo!</p>
                    <Link href={"/login"} onClick={() => logout()} >Logout?</Link>
                </div>
            </div>
        );
    } else if (!authenticated && authenticated !== undefined) {
        return (
            <div className={CSS.Logged}>
                <div className={CSS.Logged_Content}>
                    <h1>Acesso não autorizado!</h1>
                    <p>Você não têm permissão para acessar está página.</p>
                    <Link href={"/login"}>Ir para login?</Link>
                </div>
            </div>
        )
    }
};

export default Logged;
