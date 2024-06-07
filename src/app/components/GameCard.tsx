import { IGame } from "@/models/interfaces";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  game: IGame;
};

const GameCard = ({ game }: CardProps) => {
  return (
    <article className="card shadow-xl border-2 border-secondary rounded-none bg-accent">
      <figure className="p-6">
        <div className="w-full h-32">
          <Image
            priority
            width={200}
            height={128}
            src={game.splash_art}
            alt={game.splash_art}
            className="w-full"
          />
        </div>
      </figure>
      <div className={`divider divider-info my-0 md:my-4 w-3/4 mx-auto`}></div>
      <div className="card-body ">
        <div className="flex flex-col items-start">
          <Link href={`/game/${game._id}`}>
            <h2 className="card-title mb-5">{game.title}</h2>
          </Link>

        </div>
        <p>
          {game.short}
        </p>
        <div className="card-actions justify-end">
          {game.isSale &&
            <span className="line-through  my-auto color-red">{game.full_price}€</span>
          }
          <Link target="_blank" href={game.cheapest_link}>
            <button className={`btn ${game.isSale ? "btn-primary" : "btn-secondary"} rounded-full `}>
              {game.lowest_price}€
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GameCard;
