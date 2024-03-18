import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

const { Game } = require("../../models/schemas");
export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const gamesToDisplay = [];

  const freeGames = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Price&limit=5"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  for (const deal of freeGames) {
    console.log(deal);
    if (deal.price == 0) {
      gamesToDisplay.push(deal);
    }
  }

  const highRatedDeals = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?&pageSize=5"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  const highestRatedDealsToShow = highRatedDeals
    .filter((deal) => deal.dealRating == 10)
    .slice(0, 5 - gamesToDisplay.length);

  gamesToDisplay.push(...highestRatedDealsToShow);
  console.log("top 5", gamesToDisplay);

  const gameDetails = [];

  for (const deal of gamesToDisplay) {
    const rawgRes = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${deal.title}&search_exact=1`
    );
    const rawgData = await rawgRes.json();

    console.log("rawgresponse", rawgData);

    const gameDetailsRes = await fetch(
      `https://api.rawg.io/api/games/${rawgData.id}?key=${process.env.API_KEY}`
    );
    const rawgGameDetails = await gameDetailsRes.json();

    console.log("rawgGameDetails", rawgGameDetails);

    gameDetails.push(rawgGameDetails);

    const existingGame = await Game.findOne({
      cheapChark_id: deal.cheapChark_id,
    });
    if (!existingGame) {
      try {
        const newGame = await Game.create({
          ...rawgGameDetails,
          cheapChark_id: deal.cheapChark_id,
        });
        console.log("Game saved successfully:", newGame);
      } catch (error) {
        console.error("Error saving game:", error);
      }
    }
  }
}
