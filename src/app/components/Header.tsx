import React from "react";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="flex w-min m-auto flex-col h-auto place-items-center">
      <div className="flex">
        <h1 className="text-info text-8xl mb-4">Value</h1>
        <h1 className="text-primary text-8xl">Town</h1>
      </div>
      <div className="divider -mt-8 -mb-1 w-10/12 m-auto divider-info justify-center"></div>
      <h1 className="text-xl text-white">The Best Deals in Gaming!</h1>
    </header>
  );
}
