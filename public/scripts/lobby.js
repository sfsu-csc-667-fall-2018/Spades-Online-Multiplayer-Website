const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('games list');
});

lobbySocket.on('display games', currentGames => {
  for(let i = 0; i < currentGames.length; i++){

    const { game_id, game_name, scores_id, num_players } = currentGames[i];

    if(num_players < 4){
      $('#games').append(`
        <form action='/lobby/joingame', method='POST'>
          <input type="submit" name="game_id" value="${game_id}" />
        </form>`);
    } else {
      $('#games').append('<li><button onclick="myFunction()">' + game_name + ' : ' + 'FULL' + '</button></li>');
    }
  }  
});
