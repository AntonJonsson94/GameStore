export type Deal = {
  id: String;
  name: String;
  price: Number;
  original_price: Number;
  discount: Number;
  store_id: String;
};

export type GameDetails = {
  id: String;
  long_desc: String;
  lowest_price: Number;
  deals: Deal[];
  screenshots: [];
  release_date: Date;
  related_games: [];
  short_desc: String;
};

export type Store = {
  id: String;
  name: String;
  image_url: String;
};
