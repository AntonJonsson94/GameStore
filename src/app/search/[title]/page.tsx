"use client";
import React from "react";
import Searchbar from "@/app/components/Searchbar";
import Loader from "@/app/components/Loader";
import useSearchGames from "@/hooks/useSearchGames";
import { IGame } from "@/models/interfaces";
import Image from "next/image";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;
  const { games, gamesLoading } = useSearchGames(title);

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      {gamesLoading ?? <Loader />}
      <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
        {games &&
          games.map((game: IGame, index: number) => (
            <article
              className="card w-96  shadow-xl border-2 border-cyan-500 rounded-none bg-accent"
              key={index}
            >
              <figure className="px-10 pt-10">
                <div className="w-full max-h-32">
                  <Image
                    priority
                    width={200}
                    height={100}
                    src={game.splash_art}
                    alt={game.splash_art}
                    className="w-full"
                  />
                </div>
              </figure>

              <div className="card-body ">
                <div className="flex flex-col items-start">
                  <h2 className="card-title mb-5">{game.title}</h2>
                  <div className="divider divider-info m-1 w-full"></div>
                </div>
                <p className="h-16 overflow-hidden overflow-ellipsis m-2">
                  {game.description}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary rounded-full ">
                    {game.lowest_price}$
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
