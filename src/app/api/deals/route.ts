const dbConnect = require("../../lib/dbConnect");

import { cheapSharkFiveDeals, cheapSharkFiveFreeGames } from "../../utils/apiRequests";
import { createGame } from "@/app/services/createGames";

export async function GET() {
  try {
    await dbConnect();

    const games:any[] = [];

    const freeGames = await cheapSharkFiveFreeGames();

    freeGames.forEach((game: any) => {
      if (game.salePrice === "0.00") {
        games.push(game);
      }
    });

    const highestDealRatedGames = await cheapSharkFiveDeals();
    highestDealRatedGames.forEach((game:any) => {
      if (game.dealRating === "10.0") {
        games.push(game);
      }
    });


    //get unique games from the combined data, with the free ones taking prio
    const gamesToDisplay = Array.from(new Set(games.map((game:any) => game.title)))
      .map((title) => games.find((game:any) => game.title === title))
      .slice(0, 5);
    return Response.json(await createGame(gamesToDisplay[0]))
  } catch (error) {
    console.log(error)
    return new Response("error")
  }
}
