import { ICheapSharkGame, IGame } from "@/models/interfaces";
import { Game } from "@/models/schemas";
import { createGame } from "./createGames";
import { updatePrice } from "./updatePrice";
const dbConnect = require("@/lib/dbConnect");
const updateOrCreateGame = async (cheapSharkGame: ICheapSharkGame) => {
  await dbConnect();

  const existingGame: IGame | null = await Game.findById(cheapSharkGame.gameID);

  if (existingGame) {
    return await updatePrice(cheapSharkGame);
  } else {
    return await createGame(cheapSharkGame);
  }
};
export default updateOrCreateGame;
