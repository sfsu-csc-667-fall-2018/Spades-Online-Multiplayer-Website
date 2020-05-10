const gameSocket = io('/game');


gameSocket.on('display cards', cards => {
    console.log(cards);
    $('#cards').empty();
    for(let i = 0; i < cards.length; i++) {
        $('#cards').append(`<li>${cards[i].image}</li>`);
    }
});