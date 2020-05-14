
const gameId = document.querySelector('#pageGameId').value

const gameStateListing = document.querySelector('#game-state-listing')
const errorDisplay = document.querySelector('#error')

document.querySelector('.cards').addEventListener('click', event => {
  const { cardId } = event.target.dataset

  fetch(`/game/${gameId}/card`, {
    method: 'post',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardId })
  })
    .then(response => response.json())
    .then(({ gameState, playerState }) => {
      // console.log(gameState, playerState)
      if((gameState !== undefined) && (playerState !== undefined)) {
        gameSocket.emit('update', {
          game: gameState, 
          player: playerState
        });
      }

      const p = document.createElement('p')
      p.innerText = JSON.stringify(gameState)

      gameStateListing.append(p)
    })
    .catch(error => {
      errorDisplay.innerText = JSON.stringify(error)
      console.log(error)
    })
})

gameSocket.on('update game', (data) => {
  console.log('update game')
  // console.log(data);
  const {state, inPlayCards} = data

  /* redraw game table */
  $('.in_play_cards').empty()
  inPlayCards.forEach(gameCard => {
    $('.in_play_cards')
      .append(`<a class="card card-${gameCard.suit}-${gameCard.value}" title="${gameCard.name}" data-card-id="${gameCard.id}"></a>`)
  });

  /* redraw players hand */
  $('.cards').empty()
  state.player.cards.forEach(gameCard => {
    $('.cards')
      .append(`<a class="card card-${gameCard.suit}-${gameCard.value}" title="${gameCard.name}" data-card-id="${gameCard.id}"></a>`)
  });

});