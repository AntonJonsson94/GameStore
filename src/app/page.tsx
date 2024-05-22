"use client";
import useGames from "@/hooks/useGames";
import { IGame } from "@/models/interfaces";
import Image from "next/image";
import Card from "./components/Card";

export default function FrontPage() {
  const { games, gamesLoading } = useGames();

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      {gamesLoading ?? (
        <div className="flex flex-wrap gap-6 w-auto h-auto justify-center">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
      <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
        {games &&
          games.map((game: IGame, index: number) => (
            <Card key={index} game={game} />
          ))}
      </div>
    </section>
  );
}
