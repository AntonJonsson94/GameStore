"use client";
import React from "react";
import Searchbar from "@/app/components/Searchbar";
import useSearchGames from "@/hooks/useSearchGames";
import Loader from "@/app/components/Loader";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;
  const { games, gamesLoading } = useSearchGames(title);

  return (
    <div className="flex flex-col items-center">
      <Searchbar />
      <div className="flex flex-wrap gap-6 w-10/12 m-6 h-auto justify-center">
        {gamesLoading ? (
          <Loader />
        ) : games.length > 0 ? (
          games.map((game, index) => (
            <article
              className="card w-96 shadow-xl border-2 border-cyan-500 rounded-none bg-accent"
              key={index}
            >
              <div className="card-body">
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
          ))
        ) : (
          <p>No games found for {title}.</p>
        )}
      </div>
    </div>
  );
}
