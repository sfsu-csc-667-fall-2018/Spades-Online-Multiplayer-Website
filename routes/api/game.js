const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');

const game = require('../../db/game');
const cards = require('../../db/game_cards');
const players = require('../../db/game_players');
const flow = require('../../db/game_flow');
const scores = require('../../db/scores');

const jrob = require('../../db/jrob');

let user, game_id;

router.get('/', isAuthenticated, (request, response) => {
  response.render(game);
});

// router.get('/:game_id', isAuthenticated, (request, response) => {
//   user = request.user;
//   game_id = request.params.game_id;
//   game.getGameRoom(game_id)
//     .then(results => {
//       if (results === undefined || results.length === 0) {
//         response.redirect('/');
//       } else {
//         response.render('game', {
//           user: user,
//           game_id: game_id
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

router.get('/:game_id', isAuthenticated, (request, response) => {
  // console.log(request.params);
  // console.log(request.user);
  const { game_id: gameId } = request.params;
  const { id: playerId, username } = request.user
  // games_players
  // game_cards

  Promise.all([
    jrob.getGameState(gameId),
    jrob.getPlayers(gameId),
    jrob.getCards(gameId)
  ])
    .then(([gameState, players, cards]) => {
      response.render('game', { gameId, gameState, players, cards, playerId, username });
    })
    .catch(error => {
      response.render('game', { error, gameId, gameState: {}, players: [], cards: [], playerId: 'Error', username: 'Error' })
    })
});

router.post('/:game_id/card', (request, response) => {
  // console.log(request.user);
  // console.log(request.params);
  // console.log(request.body);
  const { id: userId } = request.user
  const { game_id: gameId } = request.params;
  const { cardId } = request.body

  Promise.all([
    jrob.getGameState(gameId),
    jrob.getPlayerState(gameId, userId),
    jrob.getCardInfo(cardId)
  ])
    .then(([gameState, playerState, cardInfo]) => {
      /* Check that it is this users turn (user's position == current_pos) */
      if (gameState.current_pos !== playerState.position) {
        /* Player trying to play card out of turn GOTO .catch */
        return Promise.reject("Not this player's turn.")
      } else {
        /* is Player's turn */
        return Promise.resolve([gameState, playerState, cardInfo])
      }
    })
    .then(([gameState, playerState, cardInfo]) => {
      /* check if leading suit has been set */
      if (gameState.leading_suit === -1) {
        /* set leading suit to played card */
        return Promise.all([
          jrob.setLeadingSuit(cardInfo.suit, gameId),
          playerState,
          cardInfo
        ])
      } else {
        /* Check that player does not have card of leading suit */
        const hasCardOfLeadingSuit = playerState.cards.reduce((memo, card) =>
          memo || card.suit === gameState.leading_suit
          , false)

        if (hasCardOfLeadingSuit && cardInfo.suit !== gameState.leading_suit) {
          /* player making illegal move GOTO .catch */
          return Promise.reject("Player must play card of leading suit if in hand.")
        } else {
          /* player making legal move */
          return Promise.resolve([gameState, playerState, cardInfo])
        }
      }
    })
    .then(([gameState, playerState, cardInfo]) => {
      /* set card on table AND set current_pos to next postion */
      return Promise.all([  
        gameState,
        playerState,
        cardInfo,
        cards.setCardToGameTable(gameState.game_id, cardInfo.id),
        flow.setCurrentPos(gameState.game_id, gameLogic.getNextPos(gameState.current_pos))
      ])
    })
    .then(([gameState, playerState, cardInfo]) => {
      /* get the new game state */
      return Promise.all([
        jrob.getGameState(gameState.game_id),
        playerState,
        cardInfo
      ])
    })
    .then(([gameState, playerState, cardInfo]) => {
      /* send response to client */
      console.log("played card");
      response.json({ gameState, playerState, cardInfo })
    })
    .catch(error => {
      console.log(error)
      response.json({ error })
    })
});

// router.post('/:game_id/playCard', (request, response) => {
//   var gameId = request.params.game_id;
//   var cardId = request.body.card_id;
//   var playerId = request.user.id;
//   gameLogic.playCard(gameId, playerId, cardId).then((result) => {
//     if (result === 'done') {
//       console.log('Played Card');
//       gameLogic.endTurn(gameId).then(() => {
//         console.log('Ended turn');
//       });
//     } else if(result === 'invalid pos') {
//       console.log('Illegal Position');
//     } else if (result === 'invalid pos') {
//       console.log('Illegal Card')
//     } else {
//       console.log('something went wrong in router.post(\'/:game_id/playCard\'');
//     }
//     response.render('game', {
//       user: user,
//       game_id: game_id
//     });
//   });
// });

gameSocket.on('connection', socket => {
  if (game_id == null) {
    return;
  }

  console.log('Connected to game room: ' + game_id);
  socket.join(game_id);

  //sockets api functions go here
  /* if game room is full create the deck */
  gameLogic.gameReady(game_id).then((hasPlayers) => {
    console.log('\thasPlayers? : ' + hasPlayers);
    if (hasPlayers) {
      cards.deckReady(game_id).then((hasDeck) => {
        console.log('\thasDeck? : ' + hasDeck);
        if (!hasDeck) {
          players.getPlayers(game_id).then((players) => {
            console.log('\t***players***');
            console.log(players);
            cards.createDeck(game_id, players).then(() => {
              console.log("\t\tCreated Deck");
              flow.initFlow(game_id).then(() => {
                console.log("\t\tCreated Flow");
                scores.initScore(game_id).then(() => {
                  console.log("\t\tCreated Scores");
                });
              });
            });
          });
        }
      });
    }
  });

  socket.on('get hand', () => {
    /* emit cards to each player */
    console.log("Im a Race Condition!!!");
    cards.deckReady(game_id).then((hasDeck) => {
      if (hasDeck) {
        cards.getGameCards(game_id).then((cards) => {
          gameSocket
            .to(game_id)
            .emit('display cards', cards);
          console.log('\t\temit: display cards');
        })
      }
    })
  })

});


module.exports = router;