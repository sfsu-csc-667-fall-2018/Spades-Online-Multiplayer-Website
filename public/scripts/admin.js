
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
      console.log(gameState, playerState)

      const p = document.createElement('p')
      p.innerText = JSON.stringify(gameState)

      gameStateListing.append(p)
    })
    .catch(error => {
      errorDisplay.innerText = JSON.stringify(error)
      console.log(error)
    })
})