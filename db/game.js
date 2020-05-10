db = require('./index');

//add creator to owner id on initial creation to get game_id to populate to be used for other creations
const createGame = ( gameName ) => {
  return db.one(`INSERT INTO games (game_name, num_players) VALUES ('${gameName}', 1) RETURNING game_id`);
};


//remove game on completion
//more will have to be added to this as we add more linked db tables
const deleteGame = (gameId) => {
  return db.none(
    `DELETE FROM games_players WHERE game_id = '${gameId}';` +
    `DELETE FROM games WHERE game_id = '${gameId}'`);
};

//list games
const getCurrentGames = () => {
  return db.any(`SELECT * FROM games`);
};

const checkNumPlayers = (gameId) => {
  return db.one(`SELECT COUNT (*) as num_players FROM games_players WHERE game_id = '${gameId}'`);
};

const getGameRoom = (gameId) => {
  return db.one(`SELECT * FROM games WHERE game_id = '${gameId}'`);
};

const updateNumPlayers = (gameId) => {
  numPlayers = checkNumPlayers(gameId);
  return db.one(`UPDATE games SET num_players = '${numPlayers}' WHERE game_id = '${gameId}'`);
}

const initScores = (gameId) => {
  return db.one(`INSERT INTO scores (
    game_id, books_a, books_b, bags_a, bags_b, bets_a, bets_b, points_a, points_b
    ) VALUES ('${gameId}', 0, 0, 0, 0, 0, 0, 0, 0)`);
};




module.exports = { 
  createGame, 
  getCurrentGames,
  deleteGame,
  getCurrentGames,
  checkNumPlayers,
  getGameRoom,
  updateNumPlayers,
  initScores,
};


