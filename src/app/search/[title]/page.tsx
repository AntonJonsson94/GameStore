"use client";
import React from "react";
import useSearchGames from "@/hooks/useSearchGames";
import { IGame } from "@/models/interfaces";
import Card from "@/app/components/Card";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;
  const { games } = useSearchGames(title);

 
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
