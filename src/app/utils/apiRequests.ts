export async function fetchFreeGames() {
  const response = fetch(
    "https://www.cheapshark.com/api/1.0/deals?sortBy=Price&pageSize=5"
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}

export async function fetchHighRatedDeals() {
  const response = fetch(`https://www.cheapshark.com/api/1.0/deals?&pageSize=5`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}

export async function fetchRawgGame(title: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${title}&pageSize=1`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}

export async function fetchRawgGameScreenshots(title: string) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${title}/screenshots?key=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}

export async function fetchRawgGameDetails(id: number) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}

export async function GetGame(title: string) {
  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/games?title=${title}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return await response;
}
