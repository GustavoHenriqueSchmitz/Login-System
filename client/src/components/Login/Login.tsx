"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import api from "@/service/api";
import CSS from "./Login.module.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    return (
        <div className={CSS.Login}>
            <div className={CSS.Login_container}>
                <div className={CSS.Login_containerTitle}>
                    <h1>Welcome to the chat system!</h1>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    api.post("/auth/login", {
                        email: formData.email,
                        password: formData.password
                    }).then((results) => {
                        console.log(results)
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
                                setFormData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                            className={CSS.Login_containerFormInput}
                        />
                    </div>
                    <div className={CSS.Login_containerFormAlignInputs}>
                        <label className={CSS.Login_containerFormLabel}>
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={CSS.Login_containerFormInput}
                            onChange={(e) => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    [e.target.name]: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className={CSS.Login_containerFormAlignInputs}>
                        <button type="submit" className={CSS.Login_containerFormButton}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
