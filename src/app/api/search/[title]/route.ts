import { ICheapSharkGame, IGame } from "@/models/interfaces";

import updateOrCreateGame from "@/services/updateOrCreateGame";

export async function GET(
  request: Request,
  { params }: { params: { title: string } }
) {
    try {

        const cheapsharkgameResponse: ICheapSharkGame[] = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?title=${params.title}&pageSize=10`,
          { next: { revalidate: 86400 } }
        ).then((res) => res.json());
    

        const gamesToDisplay: IGame[] = [];
    
        for (const cheapSharkGame of cheapsharkgameResponse) {
          try {
            const gameToPush = await updateOrCreateGame(cheapSharkGame);
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