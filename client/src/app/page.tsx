import Image from "next/image";
import CSS from "./page.module.css";
import Login from "../components/Login/Login";

export default function Home() {
  return (
    <div className={CSS.Home}>
      <Login/>
    </div>
  );
}
