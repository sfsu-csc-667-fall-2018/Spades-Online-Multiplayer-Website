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

let user, game_id;

router.get('/', isAuthenticated, (request, response) => {
  response.render(game);
});

router.get('/:game_id', isAuthenticated, (request, response) => {
  user = request.user;
  game_id = request.params.game_id;
  game.getGameRoom(game_id)
    .then(results => {
      if(results === undefined || results.length === 0){
        response.redirect('/');
      } else {
        response.render('game', {
          user: user,
          game_id: game_id
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/:game_id/playCard', (request,response) => {
  var gameId = request.params.game_id;
  var cardId = request.body.card_id;
  // gameLogic.playCard(gameId, cardId).then((wasPlayed) => {
  //   if(wasPlayed) {
  //     console.log('Played Card');
  //   } else {
  //     console.log('Illegal Move');
  //   }
  // });
  cards.getPlayer(gameId, cardId).then((playerId) => {
    gameLogic.isValidPosition(gameId, playerId).then((isValid_pos) => {
      console.log('\tValidPos? : ' + isValidPos);
      if(isValid_pos) {
        gameLogic.isValidCard(gameId, playerId, cardId).then((isValid_card) => {
          console.log('\tValidCard? : ' + isValid_card);
          if(isValid_card) {
            /* put card in table --> set card order = -1 */
            gameLogic.playCard(gameId, cardId).then(() => {
              console.log("Played Card");
            });
          }
        });
      }
    });
  });
});

gameSocket.on('connection', socket => {
  if(game_id == null){
    return;
  }

  console.log('Connected to game room: ' + game_id);
  socket.join(game_id);

  //sockets api functions go here
  /* if game room is full create the deck */
  gameLogic.gameReady(game_id).then((hasPlayers) => {
    console.log('\thasPlayers? : ' + hasPlayers);
    if(hasPlayers) {
      cards.deckReady(game_id).then((hasDeck) => {
        console.log('\thasDeck? : ' + hasDeck);
        if(!hasDeck) {
          players.getPlayers(game_id).then((players) => {
            console.log('\t***players***');
            console.log(players);
            cards.createDeck(game_id, players).then(() => {
              console.log("\t\tCreated Deck");
              flow.initFlow(game_id).then(() => {
                console.log("\t\treated Flow");
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
      if(hasDeck) {
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