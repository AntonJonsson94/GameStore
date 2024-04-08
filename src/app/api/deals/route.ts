import { IGame, ICheapSharkGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";
import { createGame } from "@/services/createGames";
import { cheapSharkFiveFreeGames, cheapSharkFiveDeals } from "@/utils/apiRequests";
const dbConnect = require('@/lib/dbConnect')

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

    const gamesToDisplay:IGame[] = [] 
    //get unique games from the combined data, with the free ones taking prio
    const fiveCheapSharkGames:ICheapSharkGame[] = Array.from(new Set(games.map((game:any) => game.title)))
      .map((title) => games.find((game:any) => game.title === title))
      .slice(0, 5);



      for (const game of fiveCheapSharkGames) {
        const existingGame = await Game.findOne({
          cheap_shark_id: game.gameID
        });
        // console.log(existingGame)
        createGame(game)
        if(!existingGame) {
          gamesToDisplay.push(await createGame(game))
        } else {

        }
     }



    return Response.json(gamesToDisplay)


  } catch (error) {
    console.log(error)
    return new Response("error")
  }
}
