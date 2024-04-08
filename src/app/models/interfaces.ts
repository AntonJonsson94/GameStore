export interface IStoreOffer {
    id: string;
    name: string;
    price: number;
    original_price: number;
    discount: number;
    store_id: string;
  };
  //our game, this is what we pice together with data from RAWG and CheapShark
  export interface IGame {
    id: string;
    title: string;
    description: string;
    lowest_price: string;
    full_price: string,
    storeOffers: [IStoreOffer];
    screenshots: [IScreenshot];
    release_date: string;
    cheap_shark_id: string;
    splash_art: string;
    metacritic_score: string;
  };
  
  export interface IScreenshot {
    id?: string,
    image: string,
    width?: string,
    height?: string, 
    is_deleted?: boolean
  }
  // store from cheapshark
  export interface IStore {
    id: string;
    name: string;
    image_url: string;
  };
  export interface ICheapSharkGame {
    internalName: string;
    title: string;
    metacriticLink:string;
    dealID:string;
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
    id?: number
    slug?: string
    name?: string
    name_original?: string
    description: string
    metacritic?: any
    metacritic_platforms?: any[]
    released?: string
    tba?: boolean
    updated?: string
    background_image?: string
    background_image_additional?: string
    website?: string
    rating?: number
    rating_top?: number
    added?: number
    playtime?: number
    screenshots_count?: number
    movies_count?: number
    creators_count?: number
    achievements_count?: number
    parent_achievements_count?: number
    reddit_url?: string
    reddit_name?: string
    reddit_description?: string
    reddit_logo?: string
    reddit_count?: number
    twitch_count?: number
    youtube_count?: number
    reviews_text_count?: number
    ratings_count?: number
    suggestions_count?: number
    alternative_names?: any[]
    metacritic_url?: string
    parents_count?: number
    additions_count?: number
    game_series_count?: number
    user_game?: any
    reviews_count?: number
    saturated_color?: string
    dominant_color?: string
    developers?: Developer[]
    genres?: Genre[]
    publishers?: Publisher[]
    esrb_rating?: any
    clip?: any
    description_raw?: string
  }
  
  
  interface Publisher {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }
  interface Developer {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }
  interface Genre {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }