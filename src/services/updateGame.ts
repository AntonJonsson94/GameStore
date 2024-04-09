import { IGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";

export async function updateGame(game: IGame) {
  try {
    console.log(game.title);
    const update = { full_price: game.full_price };

    const res = await Game.findOneAndUpdate(
      { cheap_shark_id: game.cheap_shark_id },
      update,
      { new: true }
    );
    if (res) {
      console.log(res.full_price);
    } else {
      console.log("no game found");
    }
  } catch (error) {
    console.error("Error updating game:", error);
  }
}
