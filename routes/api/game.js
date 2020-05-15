const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');
const game = require('../../db/game');
const jrob = require('../../db/jrob');
const gamePlayers = require('../../db/game_players');

router.get('/', isAuthenticated, (request, response) => {
  response.render(game);
});

router.get('/:game_id', isAuthenticated, (request, response) => {
  const { game_id: gameId } = request.params;
  const { id: playerId, username } = request.user

  gameLogic.readyGame(gameId)
  .then((result) => {
    console.log('***', result, '***')
    Promise.all([
      jrob.getGameState(gameId),
      jrob.getPlayers(gameId),
      jrob.getPlayerState(gameId, playerId),
      jrob.getInPlayCards(gameId) 
    ])
    .then(([gameState, players, player, inPlayCards]) => {
      response.render('game', { gameId, gameState, players, player, inPlayCards, playerId, username });      
    })
    .catch(error => {
      response.render('game', { error, gameId, gameState: {}, players: [], player: [], inPlayCards: [], playerId: 'Error', username: 'Error' })
    })
  })
});

gameSocket.on('connection', socket => {
  console.log('Connected to game socket');
  
  
  socket.on('play card', (data) => {
    const { gameId, playerId, cardId } = data 

    socket.join(gameId);

    Promise.all([
      jrob.getGameState(gameId),
      jrob.getPlayerState(gameId, playerId),
      jrob.getCardInfo(cardId)
    ])
      .then(gameLogic.checkIfPlayersTurn)
      .then(gameLogic.checkIfCardsLegal)
      .then(gameLogic.putCardInPlay)
      .then(gameLogic.endTurn)
      .then(([gameState, playerState, cardInfo]) => {
        const states = {
          gameState: gameState,
          playerState: playerState,
        }

        jrob.getInPlayCards(gameId)
          .then((inPlayCards) => {
            gameSocket
              .to(gameId)
              .emit('update game', {
                states,
                inPlayCards
              }) 
          })
      })
      .catch(error => {
        console.log('***', error, '***')
      })
  })

  socket.on('ready', (gameId) => {

    socket.join(gameId);

    Promise.all([
      jrob.getGameState(gameId),
      jrob.getScores(gameId),
      jrob.getPlayers(gameId)
    ])
    .then(([gameState, gameScore, gamePlayers]) => {
      let gameStateForClient = {
        leadingSuit: gameLogic.getSuitName(gameState.leading_suit),
        currentTurnPlayerUsername: gameLogic.getCurrentTurnPlayerUsername(gameState, gamePlayers)
      }
      gameSocket
        .to(gameId)
        .emit('game state', gameStateForClient)
      
      gameSocket
        .to(gameId)
        .emit('game score', gameScore)
    })
  })
});


module.exports = router;