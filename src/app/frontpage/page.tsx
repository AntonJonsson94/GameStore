"use client";
import { IGame } from "@/models/interfaces";
import React, { useEffect, useState } from "react";

export default function FrontPage() {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch("http://localhost:3000/api/deals")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false); // Data loaded
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      });
  }, []);

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      {isLoading ? (
        <span className="loading loading-ball loading-lg"></span>
      ) : (
        <div className="flex flex-wrap gap-6 w-auto h-auto">
          {games?.map((game, index) => (
            <article
              className="card w-96 h-13 bg-base-100 shadow-xl border-2 border-cyan-500 "
              key={index}
            >
              <figure>
                <img
                  className="w-full h-48 object-cover"
                  src={game.splash_art}
                  alt={game.splash_art}
                />
              </figure>
              <div className="card-body border-rounded">
                <h2 className="card-title">{game.title}</h2>
                <p className="h-16 overflow-hidden overflow-ellipsis">
                  {game.description}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">
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
