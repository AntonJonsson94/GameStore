"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Searchbar from "./components/Searchbar";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleInputChange = () => {
    setIsSearchActive(true);
  };
  return (
    <html data-theme="gamerTheme" lang="en">
      <body className={`${inter.className}`}>
        <Header />
        {isSearchActive && (
          <Searchbar
            isActive={isSearchActive}
            onInputChange={handleInputChange}
          />
        )}
        <main className="w-2/3 mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
