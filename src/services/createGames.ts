import { ICheapSharkGame, IGDBGame, IStoreOffer } from "@/models/interfaces";
import { Game } from "@/models/schemas";
import { cheapSharkGameFromId, getIgdbGame } from "@/services/apiRequests";
import { cleanString } from "@/utils/cleanText";

export async function createGame(cheapSharkGame: ICheapSharkGame) {
  const igdbRes: IGDBGame[] = await getIgdbGame(
    cleanString(cheapSharkGame.title)
  );

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

  let splashArt = cheapSharkGame.thumb;

  if (cheapSharkGame.thumb.includes("https://cdn.cloudflare.steamstatic.com")) {
    splashArt = cheapSharkGame.thumb.replace(
      /capsule_sm_120(_alt_assets_0)?/g,
      "header"
    );
    console.log(splashArt);
  }

  // console.log(cheapSharkGame.thumb);
  if (igdbRes.length > 0) {
    const igdbGame = igdbRes[0];

    const screenshotUrls =
      igdbGame.screenshots?.map(
        (screenshot) =>
          `https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.jpg`
      ) || [];

    const artworkUrls =
      igdbGame.artworks?.map(
        (artwork) =>
          `https://images.igdb.com/igdb/image/upload/t_1080p/${artwork.image_id}.jpg`
      ) || [];

    const videoUrls =
      igdbGame.videos?.map(
        (video) => `https://www.youtube.com/watch?v=${video.video_id}`
      ) || [];

    const screenshots = [...screenshotUrls, ...artworkUrls];

    const newGame = new Game({
      title: cheapSharkGame.title,
      cheap_shark_id: cheapSharkGame.gameID,
      description: igdbGame.summary,
      lowest_price: cheapSharkGame.salePrice,
      full_price: cheapSharkGame.normalPrice,
      metacritic_score: cheapSharkGame.metacriticScore,
      release_date: cheapSharkGame.releaseDate,
      screenshots: screenshots,
      splash_art: splashArt,
      videos: videoUrls,
      store_offers: store_offers,
      discount: cheapSharkGame.savings,
      cheapest_link: `https://www.cheapshark.com/redirect?dealID=${cheapSharkGame.dealID}`
    });
    newGame.save();
    return newGame;
  } else {
    const newGame = new Game({
      title: cheapSharkGame.title,
      cheap_shark_id: cheapSharkGame.gameID,
      lowest_price: cheapSharkGame.salePrice,
      full_price: cheapSharkGame.normalPrice,
      metacritic_score: cheapSharkGame.metacriticScore,
      release_date: cheapSharkGame.releaseDate,
      store_offers: store_offers,
      discount: cheapSharkGame.savings,
      splash_art: splashArt,
      cheapest_link: `https://www.cheapshark.com/redirect?dealID=${cheapSharkGame.dealID}`
    });
    newGame.save();
    return newGame;
  }
}
