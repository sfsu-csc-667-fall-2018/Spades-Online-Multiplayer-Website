const gameSocket = io('/game');

let id, playerNames, num_players, playerBot, playerTop, playerLeft, playerRight,
  orderBot, orderTop, orderLeft, orderRight, currentPlayer, currentTurn, selectCard = false, selectedCard = '0';


$(window).on('load', () => {
  id = $('#user_id').val();
  console.log('trying to load cards');
   gameSocket.emit('get hand');
});

gameSocket.on('display cards', cards => {
    console.log(cards);
    $('#cards').empty();
    console.log(id);

    for(let i = 0; i < cards.length; i++) {
      console.log(cards[i].player_id)
      if(cards[i].player_id == id) {
        $('#cards').append(`<li>${cards[i].image}</li>`);
      }
    }
});

gameSocket.on('update score', data => {

  console.log('client displaying score');

  //$('#team1-books').empty();
  //$('#team1-bags').empty();
  //$('#team1-bets').empty();
  //$('#team1-score').empty();
  //$('#team2-books').empty();
  //$('#team2-bags').empty();
  //$('#team2-bets').empty();
  //$('#team2-score').empty();

  const { books_a, books_b, bags_a, bags_b, bets_a, bets_b, points_a, points_b } = data;

  $('#team1-books').text('Books: ' + books_a);
  $('#team1-bags').text('Bags: ' + bags_a);
  $('#team1-bets').text('Bet: ' + bets_a);
  $('#team1-score').text('Score:' + points_a);
  $('#team2-books').text('Books: ' + books_b);
  $('#team2-bags').text('Bags: ' + bags_b);
  $('#team2-bets').text('Bet: ' + bets_b);
  $('#team2-score').text('Score: ' + points_b);

});

gameSocket.on('update players', data => {
  
  const players = data.games_players;
  const num_players = players.length;

  for (let i = 0; i < num_players; i++){
    if( $('#name').val() == players[i].username ){
      orderBot = i;
    }

    break;
  };

  
  orderLeft = (orderBot + 1) % 4;
  orderTop = (orderBot + 2) % 4;
  orderRight = (orderBot + 3) % 4;

});

// //gameSocket.on('get bets', () => {});

//helpers
// const getBet = () => {
//   let bet;
//   var gameBox = $('#game-box');
//   var betPrompt = $('<input>');
//   var submit = $('<input>', {type: 'button'}).on('click', { bet = betPrompt.val() })
//   while (!Number.isInteger(bet) && bet > 13 && bet < 0){
//     gameBox.empty().append(
//       $('<p>').append('Bet: ', betPrompt),
//     submit);
//   };
//   return bet;  
// }; 

