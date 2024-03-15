import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const cheapshark = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?&pageSize=5"
  );

  const cheapsharkData = await cheapshark.json();

  const rawgRes = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${cheapsharkData[0].title}&search_exact=1`
  );
  const rawgData = await rawgRes.json();

  cheapsharkData.forEach((deal) => {
    const rawg = fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${deal.title}&search_exact=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        const rawgGameDetailsRes = fetch(
          `https://api.rawg.io/api/games/${data.id}?key=${process.env.API_KEY}`
        );
        const gameDetails = await rawgGameDetailsRes.json();
      })
      .catch((e) => console.log(e));
  });

  return new Response("hi");
}
