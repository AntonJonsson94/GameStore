import { ICheapSharkGame, IRawgGame, IScreenshot } from "@/models/interfaces";
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
    storeOffers: cheapSharkGameWithDeals.deals
  });
  await newGame.save();
  return newGame;
}
