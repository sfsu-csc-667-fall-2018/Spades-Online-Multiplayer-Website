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

const setBet = (gameId, val) => {
    
};

const startGame = (gameId) => {
    //get player at pos 1

    //set current player
};

module.exports = {
    gameReady,
    dealCards
}