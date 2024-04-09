import { ICheapSharkGame, IGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";

export async function updatePrice(game: ICheapSharkGame) {
  const update: Partial<IGame> = {
    full_price: game.normalPrice,
    lowest_price: game.salePrice,
    discount: game.savings
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
