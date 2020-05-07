const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('games list');
});

lobbySocket.on('display games', currentGames => {
  for(let i = 0; i < currentGames.length; i++){

    const { game_id, game_name, scores_id, num_players } = currentGames[i];

    if(num_players < 4){
      $('#games').append('<li><button onclick="myFunction()">' + game_name + ' : ' + num_players + '</button></li>');
    } else {
      $('#games').append('<li><button onclick="myFunction()">' + game_name + ' : ' + 'FULL' + '</button></li>');
    }
  }  
});
