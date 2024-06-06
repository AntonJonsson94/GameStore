"use client";
import { IGame } from "@/models/interfaces";
import GameCard from "./components/GameCard";
import { useCallback, useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import Link from "next/link";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";

export default function FrontPage() {
  const [games, setGames] = useState<IGame[]>();
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [short, setShort] = useState<string[]>([]);
  const [cheapLink, setCheapLink] = useState<string[]>([]);
  const [gameIds, setGameIds] = useState<string[]>([]);

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/deals")
      .then((res) => res.json())
      .then((games: IGame[]) => {
        setGames(games);
        games.map((game: IGame) => {
          setScreenshots((prev: string[]) => [...prev, game.splash_art]);
          setShort((prev: string[]) => [...prev, game.short]);
          setTitle((prev: string[]) => [...prev, game.title]);
          setCheapLink((prev: string[]) => [...prev, game.cheapest_link]);
          setGameIds((prev: string[]) => [...prev, game._id.toString()]);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNext = useCallback(
    () =>
      setIndex((prevIndex) =>
        prevIndex === short.length - 1 ? 0 : prevIndex + 1
      ),
    [short.length]
  );
  const handlePrev = useCallback(
    () =>
      setIndex((prevIndex) =>
        prevIndex === 0 ? short.length - 1 : prevIndex - 1
      ),
    [short.length]
  );

  return (
    <>
      <Searchbar />
      {!loading ? (
        <section className="flex flex-wrap place-items-center p-10 h-auto">
          <div className="card card-compact  bg-accent rounded-none border-secondary border-2 mb-10 w-full shadow-xl">
            <figure className="py-6">
              <Carousel
                content={screenshots}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </figure>
            <div className="card-body">
              <Link href={`/game/${gameIds[index]}`}>
                <h2 className="text-5xl">{title[index]}</h2>
              </Link>
              <p>{short[index]}</p>
              <div className="card-actions justify-end">
                <Link target="_blank" href={cheapLink[index]}>
                  <button className="btn btn-primary btn-wide rounded-full">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center mt-10">
            {games &&
              games.map((game: IGame, index: number) => (
                <GameCard game={game} key={index} />
              ))}
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <Loader />
          <p className="mt-2">Loading games...</p>
        </div>
      )}
    </>
  );
}
