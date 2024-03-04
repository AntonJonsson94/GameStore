
const express = require('express');
const router = express.Router();
const Game = require('./models/game.model'); // Adjust the path as necessary


router.get('/games', (req, res) => {
  https.get('https://api.rawg.io/api/games?key=293fa5434208443090a97049f7bb9ce7', (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', async () => {
      const games = JSON.parse(data).results; 
      try {
        for (const game of games) {
          const newGame = new Game({
            id: game.id,
            name: game.name,
          });

          await newGame.save();
        }
        res.status(200).send('Games populated successfully');
      } catch (error) {
        console.error('Error populating games:', error);
        res.status(500).send('Error populating games');
      }
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(500).send('Error fetching games');
  });
});

module.exports = router;
