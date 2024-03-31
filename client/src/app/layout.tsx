import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login System",
  description: "A simple login system project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`Body ${inter.className}`}>
        <video className={"VideoBackground"} autoPlay loop muted>
          <source src={"/videos/background.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={"ChildrenContent"}>
          {children}
        </div>
      </body>
    </html>
  );
}
