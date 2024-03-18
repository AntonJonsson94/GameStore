import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DealSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  original_price: Number,
  discount: Number,
  store_id: String,
});

const GameSchema = new Schema({
  id: String,
  long_desc: String,
  lowest_price: Number,
  deals: DealSchema,
  screenshots: [],
  release_date: Date,
  related_games: [],
  short_desc: String,
  cheapChark_id: String,
});

const StoreSchema = new Schema({
  id: String,
  name: String,
  image_url: String,
});

// Create models from the schemas
const Deal = mongoose.model("Deal", DealSchema);
const Game = mongoose.model("Game", GameSchema);
const Store = mongoose.model("Store", StoreSchema);

// Export the models
module.exports = {
  Deal,
  Game,
  Store,
};
