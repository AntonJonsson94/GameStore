import { ICheapSharkGame, IGame } from "@/models/interfaces";
import { cheapSharkGameFromTitle } from "@/services/apiRequests";
import updateOrCreateGame from "@/services/updateOrCreateGame";
import { useEffect, useState } from "react";

interface UseGamesResult {
  games: IGame[] | undefined;
  gamesLoading: boolean;
}

const useSearchGames = (title: string): UseGamesResult => {
  const [games, setGames] = useState<IGame[] | undefined>([]);
  const [gamesLoading, setGamesLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGames = async () => {
      setGamesLoading(true);
      try {
        const cheapSharkGameresponse = await cheapSharkGameFromTitle(title);
        const cheapSharkDealData: ICheapSharkGame =
          await cheapSharkGameresponse.json();

        const gameDetailsResponse = await updateOrCreateGame(
          cheapSharkDealData
        );
        setGames(gameDetailsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, [title]);

  return { games, gamesLoading };
};

export default useSearchGames;
