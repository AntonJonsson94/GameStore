import { Game } from "@/models/schemas";
import updateOrCreateGame from "@/services/updateOrCreateGame";
const dbConnect = require("@/lib/dbConnect");
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await dbConnect();
  } catch {
    console.error("Error connecting to DB");
    return Response.error;
  }

  try {
    const game = await Game.findById(id).lean();
    return Response.json(game);
  } catch (error) {
    console.error("Error getting game from DB: ");
    console.error(error);
    Response.error();
  }
}
