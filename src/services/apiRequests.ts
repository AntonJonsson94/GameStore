const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export async function cheapSharkFiveFreeGames() {
  return await fetcher(
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Price&pageSize=5"
  );
}

export async function cheapSharkFiveDeals() {
  return await fetcher("https://www.cheapshark.com/api/1.0/deals?&pageSize=5");
}

export async function cheapSharkGameFromId(id: string) {
  return await fetcher(`https://www.cheapshark.com/api/1.0/games?id=${id}`);
}

export async function rawgSearchGameFromTitle(title: string) {
  return await fetcher(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${title}&pageSize=1`
  );
}

export async function rawgScreenshots(title: string) {
  return await fetcher(
    `https://api.rawg.io/api/games/${title}/screenshots?key=${process.env.API_KEY}`
  );
}

export async function rawgGameFromID(id: number) {
  return await fetcher(
    `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
  );
}
