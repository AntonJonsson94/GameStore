const getGames = async () => {
  const response = await fetch("http://localhost:3000/api/games", {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const games = await response.json();
  return games;
};

const getGame = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/games`);
  const games = await response.json();
  return games;
};
