import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col w-2/3 mx-auto my-10 justify-center md:justify-left">
      <h2 className="text-2xl hover:underline w-fit"><Link href={"/"}>Value Town</Link></h2>
      <div className="pl-2">
        <h3 className="text-xl hover:underline w-fit"><Link href={"/about"} className="m-1">About Us</Link></h3>
        <h3 className="text-xl hover:underline w-fit"><Link href={"/contact"} className="m-1">Contact</Link></h3>
        <h3 className="text-xl hover:underline w-fit"><Link href={"/privacy"} className="m-1">Privacy Policy</Link></h3>
      </div>
    </footer>
  );
}
