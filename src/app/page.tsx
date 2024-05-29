"use client";
import { IGame } from "@/models/interfaces";
import Card from "./components/Card";
import { useState } from "react";

export default function FrontPage() {

  const [games, setGames] = useState<IGame[]>()
  const getGames = async (): Promise<Array<IGame>> => {
    return await fetch("http://localhost:3000/api/deals").then(data => data.json())
  }

  getGames().then(games => setGames(games))


  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
        {games &&
          games.map((game: IGame, index: number) => (
            <Card game={game} key={index} />
          ))}
      </div>
    </section>
  );
}
