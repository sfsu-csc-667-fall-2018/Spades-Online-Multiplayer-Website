// const games = require('../../db/game');
// const scores = require('../../db/scores');
const players = require('../../db/game_players');
// const player = require('../../db/player');
const gameCards = require('../../db/game_cards');
const cards = require('../../db/cards');

// const db = require('../../db/index');
const flows = require('../../db/game_flow');

//helpers for game logic 

//check for 4 players after every join
const gameReady = async (gameId) => {
    var numPlayers = await players.getNumPlayers(gameId);
    return (numPlayers.count == 4);
};

//start game
const dealCards = (gameId, playerArray) => {
    return gameCards.createDeck(gameId, playerArray);
};

//card related stuff
const playCard = (gameId, cardId) => {
    return gameCards.setToTable(gameId, cardId);
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
      flows.getCurrentPos(gameId).then((currentPos) => {
        if(playerPos.position == currentPos.current_pos) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  });
};

const isValidCard = (gameId, playerId, cardId) => {
  return new Promise(function(resolve, reject) { 
    cards.getCard(cardId).then((card) => {
      flows.getFlow(gameId).then((flow) => {
        if(flow.leading_suit == card.suit) {
          /* is valid */
          resolve(true);
        } else {
          /* need to check hand for leading suit */
          gameCards.getPlayerCards(gameId, playerId).then((playerCards) => {
            for(let i = 0; i < playerCards.length; i++) {
              if(playerCards[i].suit == flow.leading_suit) {
                /* player has card of leading suit --> illegal move */
                resolve(false);
              }
            }
            /* player does NOT have card of leading suit --> can play any card */
            resolve(true);
          });
        }
      });
    });
  });
};

//score related stuff
getTotalScores = (gameId) => {};

getTotalBags = (gameId) => {};

updateScores = () => {};

module.exports = {
    gameReady,
    dealCards,
    getNextPos,
    playCard,
    isValidCard,
    isValidPosition
}