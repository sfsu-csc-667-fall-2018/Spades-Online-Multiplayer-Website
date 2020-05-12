const gameSocket = io('/game');

let id;

$(window).on('load', () => {
  id = $('#user_id').val();
  gameSocket.emit('get hand');
});

gameSocket.on('display cards', cards => {
  console.log(cards);
    $('#cards').empty();
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].player_id == id && cards[i].card_order > 0) {
        $('#cards').append(`
          <li>
            ${cards[i].image}
            <button type=submit name="card_id" value=${cards[i].id}>
              Play '${cards[i].name}'
            </button>
          </li>
        `);
      }
    }

});
