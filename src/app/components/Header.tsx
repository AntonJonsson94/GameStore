import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex w-min m-auto flex-col h-auto place-items-center">
      <Link href={"/"}>
        <div className="flex">
          <h1 className="logo-value">Value</h1>
          <h1 className="logo-town">Town</h1>
        </div>
        <div className="divider -mt-8 -mb-1 w-10/12 m-auto divider-info justify-center"></div>
        <h1 className="text-xl text-center text-white">
          The Best Deals in Gaming!
        </h1>
      </Link>
    </header>
  );
}
