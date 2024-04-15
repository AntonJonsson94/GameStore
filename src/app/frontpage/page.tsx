"use client";
import { IGame } from "@/models/interfaces";
import React, { useEffect, useState } from "react";

export default function FrontPage() {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/deals")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      {isLoading ? (
        <div className="flex flex-wrap gap-6 w-auto h-auto justify-center">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 w-auto h-auto justify-center">
          {games?.map((game, index) => (
            <article
              className="card w-96  shadow-xl border-2 border-cyan-500 rounded-none bg-accent"
              key={index}
            >
              <figure className="px-10 pt-10">
                <div className="w-full max-h-32">
                  <img
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
      )}
    </section>
  );
}