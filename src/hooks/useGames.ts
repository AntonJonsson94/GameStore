import { IGame } from "@/models/interfaces";
import { useEffect, useState } from "react";

interface UseGamesResult {
  games: IGame[] | undefined;
  gamesLoading: boolean;
}

const useGames = (): UseGamesResult => {
  const [games, setGames] = useState();
  const [gamesLoading, setGamesLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setGamesLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/deals");
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();

        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, []);
  return { games, gamesLoading };
};
export default useGames;
