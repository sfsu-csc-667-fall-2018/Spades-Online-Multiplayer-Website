const lobbySocket = io('/lobby');

lobbySocket.on('get games', () => {
  lobbySocket.emit('game list');
});

lobbySocket.on('display games', currentGames => {
  const gameList = $('#games_list');
  for(let i = 0; i < currentGames.length; i++){
    gameList.append($('<li>').text(currentGames[i]));
  }
});