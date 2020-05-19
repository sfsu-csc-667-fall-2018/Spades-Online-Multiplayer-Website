const gameSocket = io('/game');

let id;

const gameId = document.querySelector('#pageGameId').value
const playerId = document.querySelector('#pagePlayerId').value

const gameStateListing = document.querySelector('#game-state-listing')
const errorDisplay = document.querySelector('#error')

/* play card buttons */
document.querySelector('.cards').addEventListener('click', event => {
  const { cardId } = event.target.dataset

  const data = {
    gameId: gameId,
    playerId: playerId,
    cardId: cardId
  }

  gameSocket.emit('play card', data)
})

/* score game button */
document.querySelector('.score_game').addEventListener('click', event => {
  
  const data = {
    gameId: gameId
  }

  gameSocket.emit('score game', data)
})

$(window).on('load', () => {
  gameSocket.emit('ready', gameId); 
});

/* display leading suit & current player's turn */
gameSocket.on('game state', (gameState) => {
  console.log('ready --> game state: ', gameState)
  /* Leading Suit */
  $('.leading_suit').empty()
  $('.leading_suit').append(`<h3>Leading Suit: ${gameState.leadingSuit}</h3>`)  

  /* current users turn */
  $('.current_turn').empty()
  $('.current_turn').append(`<h3>Current Turn: ${gameState.currentTurnPlayerUsername}</h3>`)

  /* set up positions for players */
  let bottomPosition;
  for(let i = 0; i < gameState.gamePlayers.length; i++) {
    if(playerId == gameState.gamePlayers[i].id) {
      bottomPosition = i;
      break;
    }
  }

  let leftPosition = (bottomPosition + 1) % 4;
  let topPosition = (bottomPosition + 2) % 4;
  let rightPosition = (bottomPosition + 3) % 4;
  console.log('bottom : ', bottomPosition)
  console.log('left   : ', leftPosition)
  console.log('top    : ', topPosition)
  console.log('right  : ', rightPosition)
  console.log('bottomPlayerName : ', gameState.gamePlayers[bottomPosition].username)
  console.log('leftPlayerName   : ', gameState.gamePlayers[leftPosition].username)
  console.log('topPlayerName    : ', gameState.gamePlayers[topPosition].username)
  console.log('rightPlayerName  : ', gameState.gamePlayers[rightPosition].username)
  console.log('bottomPlayerTeam : ', gameState.gamePlayers[bottomPosition].team)
  console.log('leftPlayerTeam   : ', gameState.gamePlayers[leftPosition].team)
  console.log('topPlayerTeam    : ', gameState.gamePlayers[topPosition].team)
  console.log('rightPlayerTeam  : ', gameState.gamePlayers[rightPosition].team)


})

/* display scores info */
gameSocket.on('game score', (score) => {
  console.log('ready --> game score: ', score)

  /* team 1 */
  $('.team1').empty()
  $('.team1').append(`<li>Score: ${score.books_a} </li>`)

  /* team 2 */
  $('.team2').empty()
  $('.team2').append(`<li>score: ${score.books_b} </li>`)
})


/* update cards on table and in players hand THEN 'ready' game table */
gameSocket.on('update game', (data) => {
  console.log('update game: ', data)
  const {states, inPlayCards} = data

  /* redraw game table */
  $('.in_play_cards').empty()
  inPlayCards.forEach(gameCard => {
    $('.in_play_cards')
      .append(`<a class="game-card card-${gameCard.suit}-${gameCard.value}" title="${gameCard.name}" data-card-id="${gameCard.id}"></a>`)
  });

  /* redraw players hand */
  $('.cards').empty()
  states.playerState.cards.forEach(gameCard => {
    $('.cards')
      .append(`<a class="game-card card-${gameCard.suit}-${gameCard.value}" title="${gameCard.name}" data-card-id="${gameCard.id}"></a>`)
  });

  $('.game_message').empty()

  /* ready gametable for all players */
  gameSocket.emit('ready', gameId);
});

gameSocket.on('game scored', (gameId) => {
  $('.in_play_cards').empty()
  gameSocket.emit('ready', gameId)
});

gameSocket.on('game message', (message) => {
  $('.game_message').empty()
  $('.game_message').append(`<h1>${message}</h1>`)
})

