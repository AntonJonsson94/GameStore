import { IGame } from "@/models/interfaces";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  game: IGame;
};

const GameCard = ({ game }: CardProps) => {
  return (
    <article className="card   shadow-xl border-2 border-secondary rounded-none bg-accent">
      <figure className="px-10 pt-10">
        <div className="w-full max-h-32">
          <Image
            priority
            width={200}
            height={100}
            src={game.splash_art}
            alt={game.splash_art}
            className="w-full"
          />
        </div>
      </figure>

      <div className="card-body ">
        <div className="flex flex-col items-start">
          <Link href={`/game/${game._id}`}>
            <h2 className="card-title mb-5">{game.title}</h2>
          </Link>
          <div className="divider divider-info m-1 w-full"></div>
        </div>
        <p className="h-16 overflow-hidden overflow-ellipsis m-2">
          {game.short}
        </p>
        <div className="card-actions justify-end">
          <Link target="_blank" href={game.cheapest_link}>
            <button className="btn btn-primary  rounded-full ">
              {game.lowest_price}€
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GameCard;
