import { Game } from "@/models/schemas";
import updateOrCreateGame from "@/services/updateOrCreateGame";
import { NextResponse } from "next/server";
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
    const game = await Game.findById(id);
    if (!game)
      return NextResponse.json(
        { message: "Not found" },
        { status: 404, statusText: "Game not found" }
      );
    return Response.json(game);
  } catch (error) {
    console.error("Error getting game from DB: ");
    console.error(error);
    Response.error();
  }
}
