db = require('./index');

//add creator to owner id on initial creation to get game_id to populate to be used for other creations
const createGame = ( gameName ) => {
  return db.one(`INSERT INTO games (game_name, num_players) VALUES ('${gameName}', 1) RETURNING game_id`);
};

//game_players id, player_1: creat gameroom id teams 'a' and 'b' = 1 and 2
/*const  initGamePlayers = (gameId, playerId) => {
  return db.none(`INSERT INTO games_players (game_id, player_id, position, team) VALUES (
    '${gameId}', '${playerId}', 1, 1)`);
};*/

//add additional players
const joinGame = (gameId, playerId) => {
  checkNumPlayers(gameId)
    .then(num_players => {
      return db.none(`INSERT INTO games_players (game_id, player_id, position, team) VALUES (
        '${gameId}', '${playerId}', '${parseInt(num_players) + 1}', '${ (parseInt(num_players) + 1) % 2 }'`);
    })
    .catch(error => {
      console.log(error);
    });

};

//remove game on completion
//more will have to be added to this as we add more linked db tables
const deleteGame = (gameId) => {
  return db.none(
    `DELETE FROM game_players WHERE game_id = '${gameId}';` +
    `DELETE FROM games WHERE game_id = '${gameId}'`);
};

//list games
const getCurrentGames = () => {
  return db.any(`SELECT * FROM games`);
};

const checkNumPlayers = (gameId) => {
  return db.any(`SELECT COUNT (*) as num_playes FROM game_players WHERE game_id = '${gameId}'`)
    .then(results => {
      return results[0].num_players;
    })
    .catch(error => {
      console.log(error);    
    });
};

const getGameRoom = (gameId) => {
  return db.one(`SELECT * FROM games WHERE game_id = '${gameId}'`);
};



module.exports = { 
  createGame, 
  //initGamePlayers,
  joinGame,
  getCurrentGames,
  deleteGame,
  getCurrentGames,
  checkNumPlayers,
  getGameRoom
};


