"use client";
import useGames from "@/hooks/useGames";
import { IGame } from "@/models/interfaces";
import Card from "./components/Card";
import Loader from "./components/Loader";

export default function FrontPage() {
  const { games, gamesLoading } = useGames();

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      {gamesLoading ?? <Loader />}
      <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
        {games &&
          games.map((game: IGame, index: number) => (
            <Card key={index} game={game} />
          ))}
      </div>
    </section>
  );
}
