const lobbySocket = io();

lobbySocket.on "Get Game", () => {
  lobbySocket.emit("Game List" , {user_id: user_id});
});

lobbySocket.on("Display Games List", currentGame => {
  let game_list_div = document.getElementsByClassName('game-list-box')[0];
  let game_list_html = "";

  for (let i = 0; i < currentGame.length; i++) {
    const {
      game_id;
      gameName;
      maxPlayers;
      playerCount;
      myGame
    } = currentGame[i];

    game_list_html +=
    "<div><div class = 'games-list-left'><label>" +
    gameName +
    "</label></div>" +
    playerCount +
    "/" +
    maxPlayers +
    "</label></div> ";

    if (myGame = 1) {
      games_list_html +=
      "<div class='games-list-right'><form action='/lobby/rejoinGame' method='POST'><button class='btn btn-primary' name='rejoin_btn' value=" +
      game_id +
      " type='submit'>Re-join</button></form></div>";
     } else {
       if (playerCount < maxPlayers) {
         games_list_html +=
          "<div class='games-list-right'><form action='/lobby/joinGame' method='POST'><button class='btn btn-primary' name='join_btn' value=" +
           game_id +
           " type='submit'>Join</button></form></div>";
         }
         games_list_html +=
         "<div class='games-list-right'><form action='/lobby/observeGame' method='POST'><button class='btn btn-primary' name='watch_btn' value=" +
         game_id +
         " type='submit'>Watch</button></form></div></div>";
       }
       games_list_div.innerHTML = games_list_html;
     });
