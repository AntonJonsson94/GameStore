const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  lowest_price: { type: Number, required: true },
  metacritic_score: { type: String, required: true },
});

const gameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  lowest_price: { type: Number, required: true },
  metacritic: { type: String, required: true },
});

const gameDetailsSchema = new mongoose.Schema({
  game_id: { type: Number, required: true },
  long_description: { type: String, required: true },
  lowest_price: { type: Number, required: true },
  stores: { type: {}, required: true },
  screenshots: { type: [], required: true },
  release_date: { type: Date, required: true },
  related_games: { type: [], required: true },
  esrb_rating: { type: {}, required: true },
});



const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);
const GameDetails = mongoose.model('GameDetails', gameDetailsSchema);

module.exports = {
  User: User,
  Game: Game,
  GameDetails: GameDetails
};
