import Divider from "@/app/components/Divider";
import StoreCard from "@/app/components/StoreCard";
import { IGame } from "@/models/interfaces";
import Link from "next/link";


async function getGame(id: string) {
  const res = await fetch(`http://localhost:3000/api/game/${id}`);
  if (!res.ok) return;
  return res.json();
}

export default async function GamePage({ params }: { params: { id: string } }) {


  const game: IGame = await getGame(params.id);

  const offers = game.store_offers.map((offer) => (
    <StoreCard key={offer.dealID} offer={offer} />
  ));
  return (
    <>
      <section id="game-info" className="flex mt-6 flex-column justify-between">
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

      <h1 className="text-5xl text-info">MORE DEALS</h1>
      <div className="mt-6 grid gap-16 grid-cols-1 md:grid-cols-3">
        {offers}
      </div>
    </>
  );
}