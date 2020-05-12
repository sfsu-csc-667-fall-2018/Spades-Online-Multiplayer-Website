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
  var playerId = request.user.id;
  gameLogic.playCard(gameId, playerId, cardId).then((result) => {
    if(result === 'done') {
      console.log('Played Card');
      gameLogic.endTurn(gameId).then(() => {
        console.log('Ended turn');
      });
    } else if(result === 'invalid pos') {
      console.log('Illegal Position');
    } else if(result === 'invalid pos') {
      console.log('Illegal Card')
    } else {
      console.log('something went wrong in router.post(\'/:game_id/playCard\'');
    }
    response.render('game', {
      user: user,
      game_id: game_id
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