const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');

const game = require('../../db/game');
const cards = require('../../db/game_cards');
const players = require('../../db/game_players');

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

gameSocket.on('connection', socket => {
  if(game_id == null){
    return;
  }

  console.log('Connected to game room: ' + game_id);
  socket.join(game_id);

  //sockets api functions go here
  /* if game room is full create the deck */
  gameLogic.gameReady(game_id).then((hasPlayers) => {
    console.log('hasPlayers? : ' + hasPlayers);
    if(hasPlayers) {
      cards.deckReady(game_id).then((hasDeck) => {
        console.log('hasDeck? : ' + hasDeck);
        if(!hasDeck) {
          players.getPlayers(game_id).then((players) => {
            console.log('***players***');
            console.log(players);
            cards.createDeck(game_id, players).then(() => {
              console.log("Created Deck");
            });
          });
        }
      });
    }
  });

  socket.on(' scores', (game_id) => {

  });

  socket.on('get hand', () => {
    /* emit cards to each player */
    cards.deckReady(game_id).then((hasDeck) => {
      if(hasDeck) {
        cards.getGameCards(game_id).then((cards) => {
          gameSocket
          .to(game_id)
          .emit('display cards', cards);
          console.log('emit: display cards');
        })
      }
    })
  })

});


module.exports = router;