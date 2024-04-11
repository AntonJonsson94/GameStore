import React from "react";

export default function Header() {
  return (
    <header className="grid h-auto place-items-center">
      <div className="flex">
        <p className="logo-value font-extrabold">Value</p>
        <p className="logo-town font-extrabold">Town</p>
      </div>
      <hr className={"colors.primary"} />
      <p className="font-bold">The Best Deals in Gaming!</p>
    </header>
  );
}
