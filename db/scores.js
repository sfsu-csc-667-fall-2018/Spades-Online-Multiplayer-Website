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

const getBooks = (gameId, team) => {
  if(team == 1){
    return db.one(`SELECT books_a FROM scores WHERE game_id = ${gameId}`);
  }else if(team == 2){
    return db.one(`SELECT books_b FROM scores WHERE game_id = ${gameId}`);
  };
};

const getBags = (gameId, team) => {
  if(team == 1){
    return db.one(`SELECT bags_a FROM scores WHERE game_id = ${gameId}`);
  }else if(team == 2){
    return db.one(`SELECT bags_b FROM scores WHERE game_id = ${gameId}`);
  };
};

const addBet = (gameId, team, val) => {
  if(team == 1){
    return db.none(`UPDATE scores SET bets_a = (bets_a + ${val}) WHERE game_id = ${gameId}`);
  }else if(team == 2){
    return db.none(`UPDATE scores SET bets_b = (bets_b + ${val}) WHERE game_id = ${gameId}`);
  };
};

const addBook = (gameId, team) => {
  if(team == 1){
    return db.none(`UPDATE scores SET books_a = (books_a + 1) WHERE game_id = ${gameId}`);
  }else if(team == 2){
    return db.none(`UPDATE scores SET bets_b = (books_b + 1) WHERE game_id = ${gameId}`);
  };
};

//add scores when round is tallied, val1 = team 1, val2 = team 2
const addScore = (gameId, val1, val2) => {
  return db.none(`UPDATE scores 
    points_a = (points_a + ${val1}), 
    points_b = (points_b + ${val2}) 
    WHERE game_id = ${gameId}`);
};


const getScoreBoard = (gameId) => {
  return db.any(`SELECT * FROM scores WHERE game_id = '${gameId}'`);
};

module.exports = {
  getScoreBoard,
  getBags,
  getBooks,
  addBet,
  addBook,
  addScore
};