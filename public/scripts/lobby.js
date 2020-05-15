const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('games list');
});

lobbySocket.on('display games', currentGames => {

  $('#games').empty();
  
  for(let i = 0; i < currentGames.length; i++){

    const { game_id, game_name, num_players } = currentGames[i];
    
    const str = 'Name: ' + game_name + ' Players: ' + num_players;

    if(num_players < 4){
      const form = $( 
        `<form method="POST" action="/lobby/joinGame">
          <label>"${str}"</label>
          <input type="hidden" name="game_id" value="${game_id}"></input>
          <input type="submit" value="Join Game">
        </form>`
      );

      $('#games').append(form);

    } else {
      $('#games').append( $( '<span>' ).text( str + ' Game Full!' ) );
    }
  }  
});
