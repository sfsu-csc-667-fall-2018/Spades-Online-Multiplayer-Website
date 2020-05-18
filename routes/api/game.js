const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');
const game = require('../../db/game');
const jrob = require('../../db/jrob');
const gamePlayer = require('../../db/player')
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
    if(result !== "not enough players") {
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
    } else {
      response.render('game', { result, gameId, gameState: {}, players: [], player: [], inPlayCards: [], playerId, username })
    }
    
  })
});

gameSocket.on('connection', socket => {
  console.log('Connected to game socket');
  
  /* does all card play related backend */
  socket.on('play card', (data) => {
    const { gameId, playerId, cardId } = data 
    socket.join(gameId);
    Promise.all([
      jrob.getGameState(gameId),
      jrob.getPlayerState(gameId, playerId),
      jrob.getCardInfo(cardId)
    ])
      .then(gameLogic.checkIfInPlayCardsFull)
      .then(gameLogic.checkIfPlayersTurn)
      .then(gameLogic.checkIfCardsLegal)
      .then(gameLogic.putCardInPlay)
      .then(gameLogic.endTurn)
      // .then(gameLogic.scoreGame)
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

  /* displays leading_suit & current players turn & scores */ 
  socket.on('ready', (gameId) => {
    socket.join(gameId);
    jrob.getPlayers(gameId)
    .then((gamePlayers) => {
      if(gamePlayers.length == 4) {
        Promise.all([
          jrob.getGameState(gameId),
          jrob.getScores(gameId),
          gamePlayers
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
      } else {
        let gameStateForClient = {
          leadingSuit: "WAITING FOR GAME TO START",
          currentTurnPlayerUsername: "WAITING FOR GAME TO START"
        }
        gameSocket
        .to(gameId)
        .emit('game state', gameStateForClient)
      }
    })
  })

  /* does all score game related backend */
  socket.on('score game', (data) => {
    const gameId = data.gameId
    socket.join(gameId);
    Promise.all([
      jrob.getInPlayCards(gameId),
      jrob.getGameState(gameId)
    ])
    /* need to add check here for 4 cards inPlay */  
    .then(gameLogic.checkIfReadyToScore)  
    .then(gameLogic.scoreGame)
    .then(gameLogic.setNewPosition)
    .then(gameLogic.deleteInPlayCards)
    .then(gameLogic.resetLeadingCard)
    .then(([inPlayCards, gameState, currentWinningCard]) => {
      gameSocket
      .to(gameId)
      .emit('game scored', gameId)

      return Promise.all([
        inPlayCards, 
        gameState, 
        currentWinningCard
      ])
    })
    .then(([inPlayCards, gameState, currentWinningCard]) => {
      gameLogic.checkIfGameOver(gameId)
      .then((isOver) => {
        console.log('isOver : ', isOver)
        if(isOver) {
          gameLogic.getGameWinner(gameId)
          .then((winningTeam) => {
            console.log('winner : ', winningTeam)
            let message = `Team ${winningTeam} won the game!`
            gameSocket
            .to(gameId)
            .emit('game message', message)
          })
        } else {
          gamePlayer.getPlayerUsername(currentWinningCard.player_id)
          .then((winningPlayer) => {
            // console.log('winningplayer', winningPlayer)
            // console.log('winning card ', currentWinningCard)
            let message = `'${winningPlayer.username}' won the book with '${currentWinningCard.name}'!`
            gameSocket
            .to(gameId)
            .emit('game message', message)
          })
        }
      })
    })
    .catch((error) => {
      console.log('***', error, '***')
    })
  })
});


module.exports = router;