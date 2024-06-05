"use client";
import Carousel from "@/app/components/Carousel";
import Divider from "@/app/components/Divider";
import StoreCard from "@/app/components/StoreCard";
import { IGame } from "@/models/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function GamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/game/${params.id}`)
      .then((res) => res.json())
      .then((game) => setGame(game));
  }, [params.id]);

  const offers = useMemo(
    () =>
      game?.store_offers.map((offer) => (
        <StoreCard key={offer.dealID} offer={offer} />
      )),
    [game]
  );

  return (
    <>
      {game ? (
        <>
          <Carousel content={game.screenshots} />
          <section className="hidden md:flex flex-row justify-between mt-16">
            {game?.screenshots.map((s: string, index: number) => (
              <Image
                onClick={() => console.log(index)}
                priority
                key={s}
                src={s}
                height={100}
                width={100}
                alt=""
              />
            ))}
          </section>
          <section
            id="game-info"
            className="flex flex-col md:flex-row mt-6 justify-between"
          >
            <h1 className="text-6xl text-info w-1/2">{game.title}</h1>
            <p>
              <h1 className="text-info text-5xl">BEST PRICE</h1>
              <span className="stroke-current text-info line-through">
                {game.full_price}
              </span>{" "}
              -{" "}
              <span className="bg-red-500 text-info">
                {Math.round(Number(game.discount))}%
              </span>
              <h3 className="font-bold text-info text-3xl">
                {game.lowest_price}€{" "}
              </h3>
              <Link target="_blank" href={game.cheapest_link}>
                <button className="btn btn-primary w-full">BUY NOW</button>
              </Link>
            </p>
          </section>

          <Divider />

          <article className="text-info" id="overview">
            <h1 className="text-5xl">Overview</h1>
            <p>{game.description}</p>
          </article>

          <Divider />

          {offers ? (
            <>
              <h1 className="text-5xl text-info">MORE DEALS</h1>
              <div className="mt-6 grid gap-16 grid-cols-1 md:grid-cols-3">
                {offers}
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
