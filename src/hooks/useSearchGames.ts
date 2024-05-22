"use client";
import { IGDBGame } from "@/models/interfaces";
import { getIgdbGame } from "@/services/apiRequests";
import { useEffect, useState } from "react";

interface UseGamesResult {
  games: IGDBGame[] | undefined;
  gamesLoading: boolean;
}

const useSearchGames = (title: string): UseGamesResult => {
  const [games, setGames] = useState<IGDBGame[]>([]);
  const [gamesLoading, setGamesLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setGamesLoading(true);
      try {
        // Assuming getIgdbGame returns an array of IGDBGame objects
        const response: IGDBGame[] = await getIgdbGame(title);

        // Directly set the response to games state since it's already in the correct format
        setGames(response);
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
