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

/* PUBLIC */
/* Done for now */
const playCard = (gameId, playerId, cardId) => {
  // return gameCards.setToTable(gameId, cardId);
  return new Promise(function(resolve, reject) { 
    // console.log(gameId);
    // console.log(playerId);
    // console.log(cardId);
    isValidPosition(gameId, playerId).then((isValid_pos) => {
      // console.log('\tValidPos? : ' + isValid_pos);
      if(isValid_pos) {
        isValidCard(gameId, playerId, cardId).then((isValid_card) => {
          // console.log('\tValidCard? : ' + isValid_card);
          if(isValid_card) {
            /* put card in table --> set card order = -1 */
            gameCards.setCardToGameTable(gameId, cardId).then(() => {
              resolve('done');
            });
          } else {
            resolve('invalid card');
          }
        });
      } else {
        resolve('invalid pos');
      }
    });
  });
};

const isValidPosition = (gameId, playerId) => {
  return new Promise(function(resolve, reject) { 
    players.getPlayerPos(gameId, playerId).then((playerPos) => {
      // console.log(playerPos);
      flows.getCurrentPos(gameId).then((currentPos) => {
        // console.log(currentPos);
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
        // console.log(flow);
        if(flow.leading_suit == -1) {
          /* first card of round --> set leading suit*/
          flows.setLeadingSuit(gameId, card.suit).then(() => {
            resolve(true);
          });
        }
        else if(flow.leading_suit == card.suit) {
          /* is valid card */
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

/* PUBLIC */
const endTurn = (gameId) => {
  return new Promise(function(resolve, reject) { 
    flows.getCurrentPos(gameId).then((currentPos) => {
      console.log(currentPos);
      // flows.setCurrentPos(gameId, getNextPos())
    });
  });
};

const getNextPos = (pos) => {
  if(pos > 0 && pos < 4) { // pos = 1, 2, 3
    return (pos + 1);
  } else { // pos = 4
    return 1;
  }
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
    endTurn
}