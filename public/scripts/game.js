const gameSocket = io('/game');

let id;

$(window).on('load', () => {
  id = $('#user_id').val()
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
