const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const io = require('../../socket');
const gameSocket = io.of('/game');
const game = require('../../db/game');
const playerTable = require('../../db/game_players');

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

  checkStartCondition(game_id)
    .then(results => {
      if (results === true){
        playerTable.getPlayers(game_id)
          .then(players => { 
                
          }) 
      }
    })
    .catch(error => {console.log(error)});
});

//check if game has 4 players
const checkStartCondition = (gameId) => {
  return game.checkNumPlayers(gameId)
    .then(results => {
      console.log('num players: ' + results.num_players);
      return Promise.resolve(results.num_players == 4);
    })
    .catch(error => { console.log(error) });
};

module.exports = router;