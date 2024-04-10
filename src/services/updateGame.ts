import { ICheapSharkGame, IGame, IStoreOffer } from "@/models/interfaces";
import { Game } from "@/models/schemas";
import { cheapSharkGameFromId } from "./apiRequests";

export async function updatePrice(game: ICheapSharkGame) {
  const detailedGame = await cheapSharkGameFromId(game.gameID);
  const deals: IStoreOffer[] = detailedGame.deals;
  const update: Partial<IGame> = {
    full_price: game.normalPrice,
    lowest_price: game.salePrice,
    discount: game.savings,
    store_offers: deals
  };
  try {
    const res = await Game.findOneAndUpdate(
      { cheap_shark_id: game.gameID },
      update,
      {
        new: true
      }
    );
    return res;
  } catch (error) {
    console.error("Error updating game:", error);
    return;
  }
}
