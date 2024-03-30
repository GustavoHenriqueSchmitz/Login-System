'use client';
import React from "react";
import CSS from "./page.module.css";
import useAuth from "@/service/auth";

function Logged() {
    const { authenticated } = useAuth()

    if (authenticated) {
        return (
            <div className={""}>Teste</div>
        );
    } else {
        return (
            <div></div>
        )
    }
};

export default Logged;
