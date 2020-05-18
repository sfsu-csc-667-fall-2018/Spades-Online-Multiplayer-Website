const db = require('./index');
const gamePlayers = require('./game_players');

const getScores = (gameId) => { 
  return new Promise(function(resolve, reject) { 
    db.one(`SELECT * FROM scores WHERE game_id = ${gameId}`)
    .then(results => {
      // let scores = {
      //   team1: results.points_a,
      //   team2: results.points_b
      // }
      resolve(results);
    })
    .catch(error => { 
      // console.log('getScores: ', error)
      reject('getScores: ', error)
    });
  }) 
};

const getBooks = (gameId) => {};

const getBags = (gameId) => {};

const addBet = (gameId, team) => {};

const addBook = (gameId, playerId) => {
  return new Promise(function(resolve, reject) { 
    Promise.all([
      getScores(gameId),
      gamePlayers.getPlayer(gameId, playerId)
    ])
    .then(([scores, player]) => {
      if(playerId.position == 1 || playerId.position == 3) { 
        /* team 1 */
        db.none(`UPDATE scores SET books_a=${scores.books_a + 1}`)
      } else {
        /* team2 */
        db.none(`UPDATE scores SET books_b=${scores.books_b + 1}`)
      }
      resolve('done')
    })
    .catch(error => { 
      reject('addBook : ', error);
    })
  })
};

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
  initScore,
  addBook,
  getScores
}