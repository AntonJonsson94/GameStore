import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center">
      <Link href={"/"} className="m-1">About Us</Link>
      <Link href={"/"} className="m-1">Contact</Link>
      <Link href={"/"} className="m-1">Privacy Policy</Link>
    </footer>
  );
}
