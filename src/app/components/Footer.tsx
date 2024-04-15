import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex">
      <Link href={"/"}>About Us</Link>
      <Link href={"/"}>Contact</Link>
      <Link href={"/"}>Privacy Policy</Link>
    </footer>
  );
}
