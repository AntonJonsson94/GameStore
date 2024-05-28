import { IGame, ICheapSharkGame } from "@/models/interfaces";
import {
  cheapSharkFiveFreeGames,
  cheapSharkDeals,
} from "@/services/apiRequests";
import updateOrCreateGame from "@/services/updateOrCreateGame";

export async function GET() {
  try {
    const games: any[] = [];

    const freeGames = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?sortBy=Price&pageSize=5",
      { next: { revalidate: 86400 } }
    ).then((res) => res.json());

    freeGames.forEach((game: any) => {
      if (game.salePrice === "0.00") {
        games.push(game);
      }
    });

    const highestDealRatedGames = await cheapSharkDeals();
    highestDealRatedGames.forEach((game: any) => {
      if (game.dealRating === "10.0") {
        games.push(game);
      }
    });

    const gamesToDisplay: IGame[] = [];
    //get unique games from the combined data, with the free ones taking prio
    const cheapSharkGames: ICheapSharkGame[] = Array.from(
      new Set(games.map((game: ICheapSharkGame) => game.title))
    )
      .map((title) => games.find((game: any) => game.title === title))
      .slice(0, 6);
    for (const cheapSharkGame of cheapSharkGames) {
      gamesToDisplay.push(await updateOrCreateGame(cheapSharkGame));
    }

    return Response.json(gamesToDisplay);
  } catch (error) {
    console.error(error);
    return new Response("error");
  }
}
