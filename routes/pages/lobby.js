const express = require('express');
const router = express.Router();
const isAuthenticated = require('../../config/passport/isAuthenticated');
const game = require('../../db/game');
const playersTable = require('../../db/game_players');
const io = require('../../socket');
const lobbySocket = io.of('/lobby');

router.get('/', isAuthenticated, (request, response) => {
  const { user } = request;
  const err = request.query.error;

  playersTable.checkInGame(user.id)
    .then(results => { 
      if ( results[0] != undefined && results[0] != null) {
        console.log(user.username + ' is in game: ' + results[0].game_id);
        response.redirect(`/game/${results[0].game_id}`);
      } else {
        response.render('lobby', { user: user, error: err });
      }
    }).catch(error => { console.log(error) });
});

router.post('/creategame', isAuthenticated, (request, response) => {
  const { user } = request;
  const gameName = request.body.gameName;
  console.log('user id: ' + user.id + 'game name: ' + gameName);

  game.createGame(gameName)
    .then(results => {
      const game_id = results.game_id;
      playersTable.addPlayer(game_id, user.id)
        // .then(() => {
        //   game.initScores(game_id)
        //     .catch(error => {
        //       console.log(error);
        //     })
        // })
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
  const gameId = request.body.game_id;

  console.log('User: ' + user.username + 'JOINED GAME: ' + gameId);

  Promise.all([
    playersTable.addPlayer(gameId, user.id),
    game.updateNumPlayers(gameId)
  ])
  .then(([isAdded, isUpdated]) => {
    lobbySocket.emit('get games');
    response.redirect(`/game/${gameId}`);
  })
  .catch(error => { 
    console.log(error) 
  })
});

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

const displayGames = (socket) => {
  if (socket != undefined) {
    game.getCurrentGames()
      .then(currentGames => {
        console.log('games: ' + JSON.stringify(currentGames));
        socket.emit('display games', currentGames);
      });
  }
};

lobbySocket.on('connection', socket => {

  console.log('connected to lobby');

  lobbySocket.emit('get games');

  socket.on('games list', () => {
    displayGames(socket);
  });
});


module.exports = router;