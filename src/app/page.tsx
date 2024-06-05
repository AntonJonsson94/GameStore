"use client";
import { IGame } from "@/models/interfaces";
import Card from "./components/Card";
import { useCallback, useEffect, useMemo, useState } from "react";
import Carousel from "./components/Carousel";
import Link from "next/link";
import Loader from "./components/Loader";

export default function FrontPage() {
  const [games, setGames] = useState<IGame[]>();
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [desc, setDesc] = useState<string[]>([]);
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
          setDesc((prev: string[]) => [...prev, game.description]);
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
        prevIndex === desc.length - 1 ? 0 : prevIndex + 1
      ),
    [desc.length]
  );
  const handlePrev = useCallback(
    () =>
      setIndex((prevIndex) =>
        prevIndex === 0 ? desc.length - 1 : prevIndex - 1
      ),
    [desc.length]
  );

  return (
    <>
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
              <p>{desc[index]}</p>
              <div className="card-actions justify-end">
                <Link target="_blank" href={cheapLink[index]}>
                  <button className="btn btn-primary btn-wide rounded-full">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-rows gap-4 grid-cols-1 md:grid-cols-3 m-auto h-auto justify-center">
            {games &&
              games.map((game: IGame, index: number) => (
                <Card game={game} key={index} />
              ))}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
