// const games = require('../../db/game');
// const scores = require('../../db/scores');
const players = require('../../db/game_players');
// const player = require('../../db/player');
const cards = require('../../db/game_cards');
// const db = require('../../db/index');
const flow = require('../../db/game_flow');

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

const getNextPos = (pos) => {
    if(pos > 0 && pos < 4) { // pos = 1, 2, 3
        return (pos + 1);
    } else { // pos = 4
        return 1;
    }
}
const isValidPosition = (gameId, playerId) => {
    return new Promise(function(resolve, reject) { 
            players.getPlayerPos(gameId, playerId.player_id).then((playerPos) => {
                flow.getCurrentPos(gameId).then((currentPos) => {
                    if(playerPos.position == currentPos.current_pos) {
                        console.log('is valid position');
                        resolve(true);
                    } else {
                        console.log('is not valid position');
                        resolve(false);
                    }
                });
            });
        });
};

const isValidCard = (gameId, cardId) => {
    
};

//score related stuff
getTotalScores = (gameId) => {};

getTotalBags = (gameId) => {};

updateScores = () => {};

module.exports = {
    gameReady,
    dealCards,
    isValidCard,
    isValidPosition,
    getNextPos
}