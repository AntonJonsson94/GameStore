"use client";
import { IGame } from "@/models/interfaces";
import { cheapSharkGameFromTitle } from "@/services/apiRequests";
import { useEffect, useState } from "react";

type Props = {
  input: string;
  onNavigate: (input: string) => void;
};

export default function SearchPage({ input, onNavigate }: Props) {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    onNavigate(input);
    cheapSharkGameFromTitle(input)
      .then((data) => {
        setGames(data);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, [input, onNavigate]);

  return (
    <div>
      {games.length > 0 &&
        games.map((game) => <div key={game.cheap_shark_id}>{game.title}</div>)}
    </div>
  );
}
