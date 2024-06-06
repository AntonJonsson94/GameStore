import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex w-min mx-auto my-8 flex-col h-auto place-items-center">
      <Link href={"/"}>
        <div className="flex">
          <h1 className="text-info text-9xl">Value</h1>
          <h1 className="text-primary text-9xl">Town</h1>
        </div>
        <div className="divider -mt-2 w-10/12 m-auto divider-info justify-center"></div>
        <h1 className="text-4xl text-center text-info">
          The Best Deals in Gaming!
        </h1>
      </Link>
    </header>
  );
}
