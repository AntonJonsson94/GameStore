import React from "react";

export default function Header() {
  return (
    <header className="flex flex-col h-auto place-items-center">
      <div className="flex">
        <h1 className="logo-value">Value</h1>
        <h1 className="logo-town">Town</h1>
      </div>
      <div className="divider divider-info justify-center"></div>
      <h1 className="text-xl" text-xl>
        The Best Deals in Gaming!
      </h1>
    </header>
  );
}
