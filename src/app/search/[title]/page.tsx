"use client";
import React, { useEffect, useState } from "react";
import { IGame } from "@/models/interfaces";
import GameCard from "@/app/components/GameCard";
import Loader from "@/app/components/Loader";
import Searchbar from "@/app/components/Searchbar";
import Divider from "@/app/components/Divider";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/search/${title}`);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data: IGame[] = await response.json();
        setGames(data);
      } catch (error: any) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [title]);



  return (
    <section className="flex flex-col justify-center items-center p-10 h-auto">
      <Searchbar />
      <Divider />
      {loading ? (
        <div className="flex flex-col items-center mt-10">
          <Loader />
          <p className="mt-2">Searching for games...</p>
        </div>
      ) : (
        <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto justify-center mt-10">
          {games.length > 0 ? (
            games.map((game: IGame, index: number) => (
              <GameCard game={game} key={index} />
            ))
          ) : (
            <div className="flex flex-wrap items-center p-10">
              <p>No games found.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );


}
