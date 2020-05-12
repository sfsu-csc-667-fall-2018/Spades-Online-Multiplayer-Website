const gameSocket = io('/game');

let id, playerNames, num_players, playerBot, playerTop, playerLeft, playerRight;
let orderBot, orderTop, order

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

gameSocket.on('init score' , data => {

  console.log('client displaying score');

  const { books_a, books_b, bags_a, bags_b, bets_a, bets_b, points_a, points_b } = data;

  $('#team1-books').text(books_a);
  $('#team1-bags').text(bags_a);
  $('#team1-bets').text(bets_a);
  $('#team1-score').text(points_a);
  $('#team2-books').text(books_b);
  $('#team2-bags').text(bags_b);
  $('#team2-bets').text(bets_b);
  $('#team2-score').text(points_b);
  
});

gameSocket.on('update players', data => {
  
  playerIds = data.games_players;
  num_players = playerIds.length;


  
});