import { ICheapSharkGame, IGDBGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";
import { createGame } from "./createGames";
import { updatePrice } from "./updatePrice";
const dbConnect = require("@/lib/dbConnect");
const updateOrCreateGame = async (cheapSharkGame: ICheapSharkGame) => {
  await dbConnect();

  const existingGame = await Game.findOne({
    cheap_shark_id: cheapSharkGame.gameID,
  }).lean();

  if (existingGame) {
    return await updatePrice(cheapSharkGame);
  } else {
    return await createGame(cheapSharkGame);
  }
};
export default updateOrCreateGame;
