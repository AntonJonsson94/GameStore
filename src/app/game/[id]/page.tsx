import Divider from "@/app/components/Divider";
import StoreCard from "@/app/components/StoreCard";
import { IGame } from "@/models/interfaces";
import Image from "next/image";
import Link from "next/link";

export default async function GamePage({ params }: { params: { id: string } }) {
  async function getGame() {
    const res = await fetch(`http://localhost:3000/api/game/${params.id}`);
    if (!res.ok) return;
    return res.json();
  }

  const game: IGame = await getGame();

  return (
    <>
      <section id="game-info" className="flex flex-column justify-between">
        <h1 className="text-6xl text-info w-1/2">{game.title}</h1>
        <div>
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
        </div>
      </section>

      <Divider />

      <article className="text-info" id="overview">
        <h1 className="text-3xl">Overview</h1>
        <p>{game.description}</p>
      </article>

      <Divider />

      <StoreCard id={game.store_offers[0].storeID} />
    </>
  );
}
