const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('games list');
});

lobbySocket.on('display games', currentGames => {

  $('#games').empty();
  
  for(let i = 0; i < currentGames.length; i++){

    const { game_id, game_name, num_players } = currentGames[i];

    console.log("NUMPLAYERS: ", num_players)
    
    const str = 'Name: ' + game_name + ' Players: ' + num_players + '/4';

    if(num_players < 4){
      const form = $( 
        `<form method="POST" action="/lobby/joinGame">
          <div align="left">
            <br>
            <input class="btn-small waves-effect waves-dark" type="submit" value="Join" style="float: none; "> 
            <label>${str}</label>
            <input type="hidden" name="game_id" value="${game_id}"></input> 
            
          </div>
        </form>`
      );

      $('#games').append(form);

    } else {
      $('#games').append( $( '<span>' ).text( str + ' Game Full!' ) );
    }
  }  
});
