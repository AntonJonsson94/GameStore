import { ObjectId } from "mongoose";

//our game, this is what we pice together with data from RAWG and CheapShark
export interface IGame {
  _id: ObjectId;
  title: string;
  description: string;
  lowest_price: string;
  full_price: string;
  store_offers: IStoreOffer[];
  screenshots: string[];
  videos: string[];
  release_date: string;
  cheap_shark_id: string;
  splash_art: string;
  metacritic_score: string;
  discount: string;
  cheapest_link: string;
  short: string;
}

export interface IGDBGame {
  id: number;
  name: string;
  screenshots?: Artwork[];
  cover: Artwork;
  summary?: string;
  videos?: Video[];
  artworks?: Artwork[];
}

export interface Artwork {
  id: number;
  alpha_channel?: boolean;
  animated?: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
}

export interface Video {
  id: number;
  game: number;
  name: string;
  video_id: string;
  checksum: string;
}
export interface IStoreOffer {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
  link: string;
}

export interface IScreenshot {
  id?: string;
  image: string;
  width?: string;
  height?: string;
  is_deleted?: boolean;
}
// store from cheapshark
export interface IStore {
  id: string;
  name: string;
}
export interface ICheapSharkGame {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  releaseDate: string;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface IRawgGame {
  id?: number;
  slug?: string;
  name?: string;
  name_original?: string;
  description: string;
  metacritic?: any;
  metacritic_platforms?: any[];
  released?: string;
  tba?: boolean;
  updated?: string;
  background_image?: string;
  background_image_additional?: string;
  website?: string;
  rating?: number;
  rating_top?: number;
  added?: number;
  playtime?: number;
  screenshots_count?: number;
  movies_count?: number;
  creators_count?: number;
  achievements_count?: number;
  parent_achievements_count?: number;
  reddit_url?: string;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  reddit_count?: number;
  twitch_count?: number;
  youtube_count?: number;
  reviews_text_count?: number;
  ratings_count?: number;
  suggestions_count?: number;
  alternative_names?: any[];
  metacritic_url?: string;
  parents_count?: number;
  additions_count?: number;
  game_series_count?: number;
  user_game?: any;
  reviews_count?: number;
  saturated_color?: string;
  dominant_color?: string;
  developers?: Developer[];
  genres?: Genre[];
  publishers?: Publisher[];
  esrb_rating?: any;
  clip?: any;
  description_raw?: string;
}

interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
