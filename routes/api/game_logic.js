// const games = require('../../db/game');
// const scores = require('../../db/scores');
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

//card related stuff
const playCard = () => {

};

//score related stuff
getTotalScores = (gameId) => {

};

getTotalBags = (gameId) => {

};

updateScores = () => {
    
};

module.exports = {
    gameReady,
    dealCards
}