// const games = require('../../db/game');
const scores = require('../../db/scores');
const players = require('../../db/game_players');
// const player = require('../../db/player');
const cards = require('../../db/game_cards');
// const db = require('../../db/index');

//helpers for game logic 

//check for 4 players after every join
const gameReady = async (gameId) => {
  var numPlayers = await players.getNumPlayers(gameId);
  return (numPlayers.count == 4);
};

//start game
const dealCards = (gameId, playerArray) => {
  return cards.createDeck(gameId, playerArray);
};

const setBet = (gameId, playerId, val) => {
  return players.checkTeam(playerId)
    .then(team => {
      scores.addBet(gameId, parseInt(team), val);
    })
    .catch(error => { console.log(error) });
};

const startGame = (gameId) => {
  //get player at pos 1

  //set current player
};

//update on book end: if winner pos = 1, turn order = [ 1,2,3,4 ]
//if winner pos = 3 order = [ 3,4,1,2 ] etc
const updateBookTurnOrder = (winner) =>{
  let turn_arr;

  if (winner == 1) turn_arr = [1, 2, 3, 4];
  if (winner == 2) turn_arr = [2, 3, 4, 1];
  if (winner == 3) turn_arr = [3, 4, 1, 2];
  if (winner == 4) turn_arr = [4, 1, 2, 3];

  return turn_arr;

};

module.exports = {
  gameReady,
  dealCards,
  setBet
}