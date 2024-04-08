const dbConnect = require("../../lib/dbConnect");

import {
  cheapSharkFiveFreeGames,
  cheapSharkFiveDeals,
} from "../../utils/apiRequests";
import { createGame } from "@/app/services/createGames";

export async function GET() {
  try {
    await dbConnect();

    const games:any = [];

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
    const gamesToDisplay = Array.from(
      new Set(games.map((game:any) => game.title))
    )
      .map((title) => games.find((game:any) => game.title === title))
      .slice(0, 5);
   ;
    return Response.json(await createGame(gamesToDisplay[0]))


    // for (const game of gamesToDisplay) {
    //   try {
    //     const rawgGame = await fetchRawgGame(game.title);

    //     const rawgGameScreenshots = await fetchRawgGameScreenshots(
    //       rawgGame.results[0].slug
    //     );

    //     const gameDetails = await fetchRawgGameDetails(rawgGame.results[0].id);

    //     const combinedGame = {
    //       ...game,
    //       ...gameDetails,
    //       ...rawgGameScreenshots,
    //     };
    //     console.log("this is one game");
    //     console.log(combinedGame);

    //     const GameModel = {
    //       id: combinedGame.id,
    //       name: combinedGame.name,
    //       description: combinedGame.description,
    //       lowest_price: combinedGame.salePrice,
    //       deals: game,
    //       screenshots: rawgGameScreenshots,
    //       release_date: combinedGame.released,
    //       cheapChark_id: combinedGame.dealID,
    //       background_image: combinedGame.background_image,
    //       metacritic: combinedGame.metacritic,
    //       publishers: combinedGame.publishers,
    //     };

    //     const existingGame = await Game.findOne({
    //       cheapChark_id: game.dealID,
    //     });

    //     if (!existingGame) {
    //       try {
    //         const newGame = await Game.create(GameModel);
    //         console.log("Game saved successfully:", newGame);
    //         const populatedGame = await Game.findById(newGame._id).populate(
    //           "games"
    //         );
    //         return populatedGame;
    //       } catch (error) {
    //         console.error("Error saving game:", error);
    //         return null;
    //       }
    //     }
    //   } catch (error) {
    //     console.error(`Error processing game ${game.title}:`, error);
    //     return null;
    //   }
    // }
  } catch (error) {
//    console.error(error);
  }
}
