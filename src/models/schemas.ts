import mongoose, { Schema } from "mongoose";
import { IGame, IStore, IStoreOffer } from "./interfaces";

const ScreenshotSchema = new Schema({
  id: { type: String, required: false },
  image: { type: String, required: true },
  width: { type: String, required: false },
  height: { type: String, required: false },
  is_deleted: { type: Boolean, required: false }
});
const StoreOfferSchema = new Schema<IStoreOffer>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  original_price: { type: Number, required: true },
  discount: { type: Number, required: true },
  store_id: { type: String, required: true }
});

const GameSchema = new Schema<IGame>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  splash_art: { type: String, required: true },
  lowest_price: { type: String, required: true },
  full_price: { type: String, required: true },
  release_date: { type: String, required: true },
  metacritic_score: { type: String, required: false },
  cheap_shark_id: { type: String, required: true },
  screenshots: { type: [ScreenshotSchema], required: true },
  store_offers: { type: [StoreOfferSchema], required: true },
  discount: { type: String, required: true }
});

const StoreSchema = new Schema<IStore>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image_url: { type: String, required: true }
});

const StoreOffer =
  mongoose.models.StoreOffer ||
  mongoose.model<IStoreOffer>("StoreOffer", StoreOfferSchema);
const Game = mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);
const Store =
  mongoose.models.Store || mongoose.model<IStore>("Store", StoreSchema);

export { StoreOffer, Game, Store };
