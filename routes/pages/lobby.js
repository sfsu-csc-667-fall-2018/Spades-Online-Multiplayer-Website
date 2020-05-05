const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const game = require('../../db/game');
//const lobbySocket = io.of('/lobby');

router.get('/', isAuthenticated, (request, response) => {
  const { user } = request;
  const err = request.query.error;

  const lobbySocket = request.app.get('io');
  lobbySocket.on('connection', socket => {
    lobbySocket.emit('get games');
  
    socket.on('games list', () => {
      displayGames(socket);
    });
  });

  response.render('lobby', { user: user, error: err });
});

router.post('/creategame', isAuthenticated, (request, response) => {
  const { user } = request;
  const  gameName  = request.body.gameName;
  console.log(user + 'game name: ' + gameName);

  game.createGame(gameName)
    .then(results => {
      const game_id  = results.game_id;
      game.initGamePlayers(game_id, user.id)
        .then(() => {
          lobbySocket.emit('get games');
          response.redirect(`/game/${game_id}`);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/joinGame', (request, response) => {
  const { user } = request;
  const { joinButton: gameId } = request.body.gameId;

  try {
    game.joinGame(gameId, user.id);
    lobbySocket.emit('get games');
    response.redirect(`/game/${gameId}`);
  }catch(error) {
    console.log(error);
  };  
});

router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
});

const displayGames = (socket) => {
  if (socket != undefined){
    game.getCurrentGames()
      .then(currentGames => {
        setTimeout(() => {
          socket.emit('display games', currentGames);
        }, 200);    
      });
  }
};


module.exports = router;