import { Game } from "../models/schemas";

export async function insertGame(game) {
  try {
    const query = { cheapChark_id: game.dealID };
    const update = { $setOnInsert: game };
    const options = { upsert: true };

    const result = await Game.updateOne(query, update, options);
    if (result.upsertedCount > 0) {
      console.log("Game saved successfully:", result.upsertedId);
      const populatedGame = await Game.findById(result.upsertedId).populate(
        "games"
      );
      return populatedGame;
    } else {
      console.log("Game already exists, no changes made.");
      return null;
    }
  } catch (error) {
    console.error("Error saving game:", error);
  }
}
