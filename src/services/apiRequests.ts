const fetcher = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};

const headersIGDB = {
  "Client-ID": process.env.IGDB_CLIENT_ID || "",
  Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}` || "",
  "Content-Type": "application/json"
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
    `https://www.cheapshark.com/api/1.0/deals?title=${title}&pageSize=10`
  );
}

export async function getIgdbGame(name: string) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    body: `
    search "${name}"; 
    fields name, artworks.*, screenshots.*, videos.*, summary, cover.*;
    where platforms = (6);`,
    headers: headersIGDB
  });
  return await res.json();
}
