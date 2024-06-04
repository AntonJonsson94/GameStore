"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="gamerTheme" lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <Searchbar/>
        <main className="w-2/3 mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
