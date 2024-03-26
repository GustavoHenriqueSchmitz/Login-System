'use client';
import Image from "next/image";
import CSS from "./page.module.css";
import Login from "../components/Login/Login";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className={CSS.Home}>
      <Login/>
    </div>
  );
}
