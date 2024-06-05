"use client";
import { IGame } from "@/models/interfaces";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";

export default function FrontPage() {
  const [games, setGames] = useState<IGame[]>();

  useEffect(() => {
    fetch("http://localhost:3000/api/deals")
      .then((res) => res.json())
      .then((games) => setGames(games));
  }, []);

  return (
    <section className="flex flex-col justify-center items-center p-10 h-auto">
      <Searchbar />
      {games ? (
        <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center mt-10">
          {games.map((game: IGame, index: number) => (
            <Card game={game} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <Loader />
          <p className="mt-2">Loading games...</p>
        </div>
      )}
    </section>
  );
  
}
