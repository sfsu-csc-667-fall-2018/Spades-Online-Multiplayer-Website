const db = require('./index');
const playerTable = require('./game_players');

const getScores = (gameId) => { 
  db.one(`SELECT points_a, points_b FROM socres WHERE game_id = '${gameId}'`)
    .then(results => {
      let scores = {
        team1: results.points_a,
        team2: results.points_b
      }
      console.log(scores);
      return scores;
    })
    .catch(error => { console.log(error) }); 
};

const getBooks = (gameId) => {};

const getBags = (gameId) => {};

const addBet = (gameId, team) => {};

const addBook = (gameId, team) => {};

const addScore = (gameId, team) => {};

const getTeam = (gameId, playerId) => {};

const getScoreBoard = (gameId) => {
  return db.any(`SELECT * FROM scores WHERE game_id = '${gameId}'`);
};

module.exports = {
  getScoreBoard
};