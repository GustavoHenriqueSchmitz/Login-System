'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import api from "./api";

const useAuth = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthenticated(false);
                return;
            }

            const results = await api.post("/auth/validateToken", {
                token: token,
            });

            if (results.status !== 200) {
                setAuthenticated(false);
            } else {
                setAuthenticated(true);
            }
        };

        checkAuthentication();
    }, []);

    const login = (token: string): void => {
        localStorage.setItem("token", token);
        setAuthenticated(true);
        router.push("/logged");
    };

    const logout = (): void => {
        localStorage.removeItem("token");
        setAuthenticated(false);
        router.push("/login");
    };

    return { authenticated, login, logout };
};

export default useAuth;
