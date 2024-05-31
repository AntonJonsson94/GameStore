import { IStore } from "@/models/interfaces";
import { Store } from "@/models/schemas";

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
    const store: IStore | null = await Store.findOne({ id: id });
    if (store) return Response.json(store);
    return Response.json({ message: "No store" });
  } catch (error) {
    console.error("Error getting game from DB: ");
    console.error(error);
    Response.error();
  }
  return Response.json({ id: id });
}
