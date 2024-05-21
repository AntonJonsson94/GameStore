const fetcher = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

const headersIGDB = {
  "Client-ID": process.env.IGDB_CLIENT_ID || "",
  Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}` || "",
  "Content-Type": "application/json",
};

export async function cheapSharkFiveFreeGames() {
  return await fetcher(
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Price&pageSize=5"
  );
}

export async function cheapSharkDeals() {
  return await fetcher("https://www.cheapshark.com/api/1.0/deals");
}

export async function cheapSharkGameFromId(id: string) {
  return await fetcher(`https://www.cheapshark.com/api/1.0/games?id=${id}`);
}
export async function cheapSharkGameFromTitle(title: string) {
  return await fetcher(
    `https://www.cheapshark.com/api/1.0/games?title=${title}`
  );
}

export async function getIgdbGame(name: string) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    body: `
    search "${name}"; 
    fields name, artworks.*, screenshots.*, videos.*, summary, cover.*;`,
    headers: headersIGDB,
  });
  return await res.json();
}

export async function rawgSearchGameFromTitle(title: string) {
  return await fetcher(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${title}&pageSize=1`
  );
}

export async function rawgScreenshots(title: string) {
  return await fetcher(
    `https://api.rawg.io/api/games/${title}/screenshots?key=${process.env.RAWG_API_KEY}`
  );
}

export async function rawgGameFromID(id: number) {
  return await fetcher(
    `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`
  );
}
