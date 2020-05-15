// const games = require('../../db/game');
// const player = require('../../db/player');
// const db = require('../../db/index');
const scores = require('../../db/scores');
const players = require('../../db/game_players');
const gameCards = require('../../db/game_cards');
const cards = require('../../db/cards');
const flows = require('../../db/game_flow');
const jrob = require('../../db/jrob');

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
// const endTurn = (gameId) => {
//   return new Promise(function(resolve, reject) { 
//     flows.getCurrentPos(gameId).then((currentPos) => {
//       console.log(currentPos);
//       // flows.setCurrentPos(gameId, getNextPos())
//     });
//   });
// };

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

/******************2.0***************** */
/* game room */
const readyGame = (gameId) => {
  return new Promise(function(resolve, reject) { 
    players.getNumPlayers(gameId).then((numPlayers) => {
      if (numPlayers.count == 4) {
        gameCards.deckReady(gameId).then((hasDeck) => {
          if (!hasDeck) {
            players.getPlayers(gameId).then((players) => {
              Promise.all([
                gameCards.createDeck(gameId, players),
                flows.initFlow(gameId),
                scores.initScore(gameId)
              ]).then(_ => {
                resolve('initialized game tables')
              })              
            })
          } else {
            resolve('game tables already initialized')
          }
        })
      } else {
        resolve('not enough players')
      }
    })
  })
}

/* play card */
const checkIfPlayersTurn = ([gameState, playerState, cardInfo]) => {
  /* Check that it is this users turn (user's position == current_pos) */
  if (gameState.current_pos !== playerState.position) {
    // Player trying to play card out of turn GOTO .catch
    return Promise.reject("Not this player's turn.")
  } else {
    // is Player's turn
    return Promise.resolve([gameState, playerState, cardInfo])
  }
}

const checkIfCardsLegal = ([gameState, playerState, cardInfo]) => {
  /* check if leading suit has been set */
  if (gameState.leading_suit === -1) {
    // set leading suit to played card
    console.log('set leading suit')
    return Promise.all([
      jrob.setLeadingSuit(cardInfo.suit, gameState.game_id),
      // gameState,
      playerState,
      cardInfo
    ])
  } else {
    /* Check that player does not have card of leading suit */
    const hasCardOfLeadingSuit = playerState.cards.reduce((memo, card) =>
      memo || card.suit === gameState.leading_suit
      , false)

    if (hasCardOfLeadingSuit && cardInfo.suit !== gameState.leading_suit) {
      // player making illegal move GOTO .catch
      return Promise.reject("Player must play card of leading suit if in hand.")
    } else {
      // player making legal move
      console.log('card is legal');
      return Promise.resolve([gameState, playerState, cardInfo])
    }
  }
}

const putCardInPlay = ([gameState, playerState, cardInfo]) => {
  return Promise.all([  
    gameState,
    playerState,
    cardInfo,
    gameCards.setCardToInPlay(gameState.game_id, cardInfo.id),
  ])
}

const endTurn = ([gameState, playerState, cardInfo]) => {
  return Promise.all([
    flows.setCurrentPos(gameState.game_id, getNextPos(gameState.current_pos)),
    jrob.getPlayerState(gameState.game_id, playerState.id),
    cardInfo
  ])
}
/* play card */

/* helpers */
const getSuitName = (suitValue) => {
    if(suitValue == 1) return 'Spades'
    else if(suitValue == 2) return 'Diamonds'
    else if(suitValue == 3) return 'Clubs'
    else if(suitValue == 4) return'Hearts'
    else return 'No Leading Suit Set Yet'
}

const getCurrentTurnPlayerUsername = (gameState, gamePlayers) => {
  // console.log(gameState)
  for(let i = 0; i < gamePlayers.length; i++) {
    if(gamePlayers[i].position == gameState.current_pos) {
      // console.log('hello')
      return gamePlayers[i].username
    }
  }
}
/* helpers */
/******************2.0***************** */

module.exports = {
    dealCards,
    playCard,
    /* version 2 */
    readyGame,
    checkIfPlayersTurn,
    checkIfCardsLegal,
    putCardInPlay,
    endTurn,
    getSuitName,
    getCurrentTurnPlayerUsername
}