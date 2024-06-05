import { ICheapSharkGame, IGame } from "@/models/interfaces";

import updateOrCreateGame from "@/services/updateOrCreateGame";

export async function GET(
  request: Request,
  { params }: { params: { title: string } }
) {
    try {
        const cheapsharkgameResponse: ICheapSharkGame[] = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?title=${params.title}&pageSize=20`,
          { next: { revalidate: 86400 } }
        ).then((res) => res.json());
    
        const uniqueGamesMap = new Map<string, ICheapSharkGame>();
    
        for (const cheapSharkGame of cheapsharkgameResponse) {
          const existingGame = uniqueGamesMap.get(cheapSharkGame.gameID);
          if (!existingGame || cheapSharkGame.salePrice < existingGame.salePrice) {
            uniqueGamesMap.set(cheapSharkGame.gameID, cheapSharkGame);
          }
        }
        
        const gamesToDisplay: IGame[] = [];
        for (const game of uniqueGamesMap.values()) {
          try {
            const gameToPush = await updateOrCreateGame(game);
            if (gameToPush) {
              gamesToDisplay.push(gameToPush);
            }
          } catch (error) {
            console.error("Error inserting to DB:", error);
          }
        }
    
        return Response.json(gamesToDisplay);
      } catch (error) {
        console.error(error);
        return Response.error();
      }
}