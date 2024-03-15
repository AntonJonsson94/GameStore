mongoose = require("mongoose");

const DealSchema = new mongoose.Scehma({
  id: String,
  name: String,
  price: Number,
  original_price: Number,
  discount: Number,
  store_id: String,
});

const GameSchema = new mongoose.Scehma({
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

const StoreSchema = new mongoose.Scehma({
  id: String,
  name: String,
  image_url: String,
});

//

module.exports = mongoose.module(
  { game: DealSchema },
  { Game: GameSchema },
  { Store: StoreSchema }
);
