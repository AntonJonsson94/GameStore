import mongoose, { Schema } from "mongoose";
import { IGame, IStore, IStoreOffer } from "./interfaces";

const ScreenshotSchema = new Schema( {
  id: String,
  image: String,
  width: String,
  height: String, 
  is_deleted: Boolean
})
const StoreOfferSchema = new Schema<IStoreOffer>({
  id: String,
  name: String,
  price: Number,
  original_price: Number,
  discount: Number,
  store_id: String,
});

const GameSchema = new Schema<IGame>(
  {
    title: String,
    description: String,
    splash_art: String,
    lowest_price: String,
    release_date: String,
    metacritic_score: String,
    cheap_shark_id: String,
    screenshots: [ScreenshotSchema],
    storeOffers: [StoreOfferSchema]
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

const Deal = mongoose.models.Deal || mongoose.model<IStoreOffer>("Deal", StoreOfferSchema);
const Game = mongoose.models.Game || mongoose.model<IGame>("Game", GameSchema);
const Store =
  mongoose.models.Store || mongoose.model<IStore>("Store", StoreSchema);

export { Deal, Game, Store };
