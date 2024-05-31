import { Store } from "@/models/schemas";
const dbConnect = require("@/lib/dbConnect");
export async function POST() {
  try {
    await dbConnect();
  } catch {
    console.error("Error connecting to DB");
    return Response.error;
  }
  const storeData: any[] = await fetch(
    "https://www.cheapshark.com/api/1.0/stores"
  ).then((data) => data.json());

  storeData.forEach((shark_store) => {
    const store = new Store({
      id: shark_store.storeID,
      name: shark_store.storeName,
    });
    store.save();
  });

  return Response.json(storeData);
}
