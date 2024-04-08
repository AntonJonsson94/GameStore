import mongoose, { Document, Schema } from "mongoose";

export type IDeal = {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  store_id: string;
};

export type IGame = {
  id: string;
  name: string;
  description: string;
  lowest_price: string;
  deals: [string];
  screenshots: [string];
  release_date: string;
  cheapChark_id: string;
  background_image: string;
  metacritic: string;
  publishers: [string];
};

export type IStore = {
  id: string;
  name: string;
  image_url: string;
};

const DealSchema = new Schema<IDeal>({
  id: String,
  name: String,
  price: Number,
  original_price: Number,
  discount: Number,
  store_id: String,
});

const GameSchema = new Schema<IGame>(
  {
    id: String,
    name: String,
    description: String,
    lowest_price: Number,
    deals: [DealSchema],
    screenshots: [String],
    release_date: Date,
    background_image: [String],
    metacritic: String,
    cheapChark_id: String,
    publishers: [String],
  },
  {
    strictQuery: false,
  }
);

const StoreSchema = new Schema<IStore>({
  id: String,
  name: String,
  image_url: String,
});

const Deal = mongoose.models.Deal || mongoose.model<IDeal>("Deal", DealSchema);
const Game = mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);
const Store =
  mongoose.models.Store || mongoose.model<IStore>("Store", StoreSchema);

export { Deal, Game, Store };
