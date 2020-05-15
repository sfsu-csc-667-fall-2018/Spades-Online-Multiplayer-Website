const db = require('./index');
const playerTable = require('./game_players');

const getScores = (gameId) => { 
  db.one(`SELECT points_a, points_b FROM socres WHERE game_id = '${gameId}'`)
    .then(results => {
      let scores = {
        team1: results.points_a,
        team2: results.points_b
      }
      // console.log(scores);
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
  return db.one(`SELECT * FROM scores WHERE game_id = '${gameId}'`);
};

const initScore = (game_id) => {
  return db.none(`INSERT INTO scores (game_id, books_a, books_b, bags_a, bags_b, bets_a, bets_b, points_a, points_b) VALUES (
    ${game_id},
    0, 0, 0, 0, 0, 0, 0, 0
  );`)
}

module.exports = {
  initScore
}