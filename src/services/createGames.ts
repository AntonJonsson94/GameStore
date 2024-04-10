import {
  ICheapSharkGame,
  IRawgGame,
  IScreenshot,
  IStoreOffer
} from "@/models/interfaces";
import { Game } from "@/models/schemas";
import {
  rawgSearchGameFromTitle,
  rawgScreenshots,
  cheapSharkGameFromId,
  rawgGameFromID
} from "@/services/apiRequests";
import { cleanString } from "@/utils/cleanText";

export async function createGame(cheapSharkGame: ICheapSharkGame) {
  const searchResultRawg = await rawgSearchGameFromTitle(cheapSharkGame.title);
  let screenshots: IScreenshot[] = [];
  let rawgGame: IRawgGame;

  const cheapSharkGameWithDeals = await cheapSharkGameFromId(
    cheapSharkGame.gameID
  );
  const deals: IStoreOffer[] = await cheapSharkGameWithDeals.deals;

  const store_offers: IStoreOffer[] = deals.map((deal) => {
    return {
      ...deal,
      link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`
    };
  });
  //if the metadata doesn't exist on rawg it's probably a games bundle, add the description and grab everything from cheapshark instead
  if (
    cleanString(cheapSharkGame.title) ===
    cleanString(searchResultRawg.results[0].name)
  ) {
    const screenshotRes = await rawgScreenshots(
      searchResultRawg.results[0].slug
    );
    screenshots = screenshotRes.results;

    rawgGame = await rawgGameFromID(searchResultRawg.results[0].id);
  } else {
    const releaseDate = new Date(cheapSharkGame.releaseDate);
    screenshots.push({ image: cheapSharkGame.thumb });
    rawgGame = {
      description: "A bundle of games!",
      released: releaseDate.toDateString(),
      background_image: cheapSharkGame.thumb
    };
  }

  const newGame = new Game({
    title: cheapSharkGame.title,
    cheap_shark_id: cheapSharkGame.gameID,
    description: rawgGame.description,
    lowest_price: cheapSharkGame.salePrice,
    full_price: cheapSharkGame.normalPrice,
    metacritic_score: cheapSharkGame.metacriticScore,
    release_date: rawgGame.released,
    screenshots: screenshots,
    splash_art: rawgGame.background_image,
    store_offers: store_offers,
    discount: cheapSharkGame.savings
  });
  await newGame.save();
  return newGame;
}
