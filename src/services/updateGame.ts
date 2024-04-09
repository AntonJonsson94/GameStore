import { ICheapSharkGame, IGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";

export async function updateGame(game: ICheapSharkGame) {
  try {
    const res = await Game.findOneAndUpdate(
      { cheap_shark_id: game.gameID },
      game,
      {
        new: true,
      }
    );
    if (res) {
      console.log("Updated game:", res.title, res.lowest_price);
    } else {
      console.log("No game found:", game.title);
    }
  } catch (error) {
    console.error("Error updating game:", error);
  }
}
