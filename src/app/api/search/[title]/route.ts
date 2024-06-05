import { ICheapSharkGame, IGame } from "@/models/interfaces";
import updateOrCreateGame from "@/services/updateOrCreateGame";

export async function GET(request: Request, { params }: { params: { title: string } }) {
    try {
        const cheapsharkgameResponse: ICheapSharkGame[] = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?title=${params.title}&pageSize=20`,
            { next: { revalidate: 86400 } }
        ).then((res) => res.json());

     
        const uniqueGameIds = new Set<string>();
     
        const filteredGames: ICheapSharkGame[] = [];
        for (const cheapSharkGame of cheapsharkgameResponse) {
            if (!uniqueGameIds.has(cheapSharkGame.gameID)) {
                uniqueGameIds.add(cheapSharkGame.gameID);
                filteredGames.push(cheapSharkGame);
            } else {
                const existingGameIndex = filteredGames.findIndex(game => game.gameID === cheapSharkGame.gameID);
                if (existingGameIndex !== -1 && cheapSharkGame.salePrice < filteredGames[existingGameIndex].salePrice) {
                    filteredGames[existingGameIndex] = cheapSharkGame;
                }
            }
        }

        const gamesToDisplay: IGame[] = [];
        for (const cheapSharkGame of filteredGames) {
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
