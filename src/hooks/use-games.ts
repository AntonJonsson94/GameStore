import { IGame } from "@/models/interfaces";
import { useState, useEffect } from "react";

function useFetchGames() {
  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/deals")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      });
  }, []);

  return { games, isLoading };
}

export default useFetchGames;
