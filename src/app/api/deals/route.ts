const dbConnect = require("../../lib/dbConnect");

import {
  fetchFreeGames,
  fetchHighRatedDeals,
  fetchRawgGameDetails,
  fetchRawgGame,
  fetchRawgGameScreenshots,
} from "../../utils/apiRequests";
const { Game } = require("../../models/schemas");

export async function GET() {
  try {
    await dbConnect();

    const gamesToDisplay = [];

    const freeGames = await fetchFreeGames();

    freeGames.forEach((game) => {
      if (game.salePrice === "0.00") {
        gamesToDisplay.push(game);
      }
    });

    const highestDealRatedGames = await fetchHighRatedDeals();
    highestDealRatedGames.forEach((game) => {
      if (game.dealRating === "10.0") {
        gamesToDisplay.push(game);
      }
    });

    const uniqueGames = Array.from(
      new Set(gamesToDisplay.map((game) => game.title))
    )
      .map((title) => gamesToDisplay.find((game) => game.title === title))
      .slice(0, 5);

    // console.log("Top 5", uniqueGames);

    for (const game of uniqueGames) {
      try {
        const rawgGame = await fetchRawgGame(game.title);

        const rawgGameScreenshots = await fetchRawgGameScreenshots(
          rawgGame.results[0].slug
        );

        const gameDetails = await fetchRawgGameDetails(rawgGame.results[0].id);

        const combinedGame = {
          ...game,
          ...gameDetails,
          ...rawgGameScreenshots,
        };
        console.log("this is one game");
        console.log(combinedGame);

        const GameModel = {
          id: combinedGame.id,
          name: combinedGame.name,
          description: combinedGame.description,
          lowest_price: combinedGame.salePrice,
          deals: game,
          screenshots: rawgGameScreenshots,
          release_date: combinedGame.released,
          cheapChark_id: combinedGame.dealID,
          background_image: combinedGame.background_image,
          metacritic: combinedGame.metacritic,
          publishers: combinedGame.publishers,
        };

        const existingGame = await Game.findOne({
          cheapChark_id: game.dealID,
        });

        if (!existingGame) {
          try {
            const newGame = await Game.create(GameModel);
            console.log("Game saved successfully:", newGame);
            const populatedGame = await Game.findById(newGame._id).populate(
              "games"
            );
            return populatedGame;
          } catch (error) {
            console.error("Error saving game:", error);
            return null;
          }
        }
      } catch (error) {
        console.error(`Error processing game ${game.title}:`, error);
        return null;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
