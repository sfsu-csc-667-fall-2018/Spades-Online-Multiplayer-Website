const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('games list');
});

lobbySocket.on('display games', currentGames => {

  $('#games').empty();
  
  for(let i = 0; i < currentGames.length; i++){

    const { game_id, game_name, scores_id, num_players } = currentGames[i];

    $('#games').append($('<li>').text(game_name));
  }
});