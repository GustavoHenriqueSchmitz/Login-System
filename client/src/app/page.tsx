'use client';
import Link from "next/link";
import CSS from "./page.module.css";

export default function Home() {
  return (
    <div className={CSS.Home}>
      <div className={CSS.Home_Content}>
        <h1>Bem Vindo ao Projeto - Sistema de Login</h1>
        <p>Um projeto que simula um sistema de login.</p>
        <Link href={"/login"}>Ir para a página de login</Link>
      </div>
    </div>
  );
}
