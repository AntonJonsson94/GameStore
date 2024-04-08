import { Game, ICheapSharkGame, IGame, IRawgGame } from "../models/schemas";
import { cheapSharkGameFromId, fetchRawgGame, fetchRawgGameDetails, fetchRawgGameScreenshots } from "../utils/apiRequests";

export async function createGame(cheapSharkGame: ICheapSharkGame) {

    const searchResultRawg = await fetchRawgGame(cheapSharkGame.title);
    const screenshotRes = await fetchRawgGameScreenshots(
      searchResultRawg.results[0].slug
    );
    
    const cheapSharkGameWithDeals = await cheapSharkGameFromId(cheapSharkGame.gameID)

    const screenshots = screenshotRes.results
    const rawgGame:IRawgGame = await fetchRawgGameDetails(searchResultRawg.results[0].id);
    const newGame:IGame = {
      id: "1",
      title: cheapSharkGame.title,
      cheap_shark_id: cheapSharkGame.gameID,
      description: rawgGame.description,
      lowest_price: cheapSharkGame.salePrice,
      full_price: cheapSharkGame.normalPrice,
      metacritic_score: rawgGame.metacritic,
      release_date: rawgGame.released,
      screenshots: screenshots,
      splash_art: rawgGame.background_image,
      storeOffers: cheapSharkGameWithDeals.deals
    }
    return newGame
}
