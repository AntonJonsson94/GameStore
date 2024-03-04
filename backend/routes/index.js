var express = require('express');
var router = express.Router();
const gamesRoute = require("./games")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/games", gamesRoute)

module.exports = router;
