const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');

const game = require('../../db/game');
const lobbySocket = io.of('/lobby');

router.get('/', isAuthenticated, (request, response) => {
  const { user } = request;
  const err = request.query.error;

  response.render('lobby', { user: user, error: err });
});

router.post('/creategame', isAuthenticated, (request, response) => {
  const { user } = request;
  const { gameName } = request.body.gameName;

  game.createGame(gameName)
    .then(results => {
      const { gameId } = results[0];
      game.initGamePlayers(gameId, user.id)
        .then(() => {
          //lobbySocket.emit('get games');
          response.redirect(`/game/${gameId}`);
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

lobbySocket.on('connection', socket => {
  lobbySocket.emit('get games');

  socket.on('games list', () => {
    displayGames(socket);
  });
});

module.exports = router;