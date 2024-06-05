"use client";
import React, { useEffect, useState } from "react";
import { IGame } from "@/models/interfaces";
import Card from "@/app/components/Card";

type Params = {
  title: string;
};

export default function SearchResults({ params }: { params: Params }) {
  const { title } = params;
  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/api/search/${title}`);
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data: IGame[] = await response.json();
        setGames(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [title]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="flex flex-wrap place-items-center p-10 h-auto">
      <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
        {games.length > 0 ? (
          games.map((game: IGame, index: number) => (
            <Card game={game} key={index} />
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </section>
  );
}
