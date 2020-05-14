const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');
const game = require('../../db/game');
const jrob = require('../../db/jrob');
const gamePlayers = require('../../db/game_players');

let user, game_id;

router.get('/', isAuthenticated, (request, response) => {
  response.render(game);
});

router.get('/:game_id', isAuthenticated, (request, response) => {
  const { game_id: gameId } = request.params;
  const { id: playerId, username } = request.user

  game_id = gameId; /* NEED THIS FOR CONNECTION */

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

router.post('/:game_id/card', (request, response) => {
  const { id: userId } = request.user
  const { game_id: gameId } = request.params;
  const { cardId } = request.body

  Promise.all([
    jrob.getGameState(gameId),
    jrob.getPlayerState(gameId, userId),
    jrob.getCardInfo(cardId)
  ])
    .then(gameLogic.checkIfPlayersTurn)
    .then(gameLogic.checkIfCardsLegal)
    .then(gameLogic.putCardInPlay)
    .then(gameLogic.endTurn)
    .then(([gameState, playerState, cardInfo]) => {
      response.json({ gameState, playerState, cardInfo })
    })
    .catch(error => {
      console.log('***', error, '***')
      response.json({ error })
    })
});

gameSocket.on('connection', socket => {
  console.log('Connected to game room: ' + game_id);
  socket.join(game_id);
  
  socket.on('update', (state) => {
    console.log('update')
    console.log(state)
    jrob.getInPlayCards(game_id).then((inPlayCards) => {
      gameSocket
        .to(game_id)
        .emit('update game', {
          state,
          inPlayCards
        }) 
    })
  });

  socket.on('ready', () => {
    Promise.all([
      jrob.getGameState(game_id),
      jrob.getScores(game_id),
      jrob.getPlayers(game_id)
    ])
    .then(([gameState, gameScore, gamePlayers]) => {
      let gameStateForClient = {
        leadingSuit: gameLogic.getSuitName(gameState.leading_suit),
        currentTurnPlayerUsername: gameLogic.getCurrentTurnPlayerUsername(gameState, gamePlayers)
      }
      gameSocket
        .to(game_id)
        .emit('game state', gameStateForClient)
      
      gameSocket
        .to(game_id)
        .emit('game score', gameScore)
    })
  })
});


module.exports = router;