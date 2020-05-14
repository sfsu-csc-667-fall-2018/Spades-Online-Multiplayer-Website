const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const gameLogic = require('./game_logic');
const scoresTable = require('../../db/scores');
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
  })
  .then(() => {
    game.getGameData(game_id)
      .then(users=> {
        console.log('user 1: ' + JSON.stringify(users[0]) + ' user 2: ' + JSON.stringify(users[1]));
        gameSocket
          .to(game_id)
          .emit('update players', { games_players: users });
      })
      .catch(error => { console.log(error); });
  })
  .then(() => {
    scoresTable
      .getScoreBoard(game_id)
      .then( results => {
      console.log('scores: ' + JSON.stringify(results[0]));
      gameSocket.to(game_id).emit('update score' , results[0] );
      })
      .catch(error => { console.log(error) });   
  })
  .catch(error => { console.log(error); });

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