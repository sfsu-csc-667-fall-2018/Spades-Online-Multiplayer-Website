const gameSocket = io('/game');

let id;

/*************PHIL******************************** */
// gameSocket.on('update', (/*gameState, playerState, cardInfo*/) => {
//   /* rerender window */
//   console.log('Fuck this shit')
// })
/*************PHIL******************************** */


$(window).on('load', () => {
  // id = $('#user_id').val();
  // gameSocket.emit('get hand');
});

// gameSocket.on('display cards', cards => {
//   console.log(cards);
//     $('#cards').empty();
//     for(let i = 0; i < cards.length; i++) { // every card in deck
//       if(cards[i].player_id == id && cards[i].card_order > 0) {
//         /* card belongs to user */
//         $('#cards').append(`
//           <li>
//             ${cards[i].image}
//             <button type=submit name="card_id" value=${cards[i].id}>
//               Play '${cards[i].name}'
//             </button>
//           </li>
//         `);
//       } else if(cards[i].card_order == 0) {
//         /* card belongs to table */
//         $('#table').append(`
//           <li>
//             ${cards[i].image}
//           </li>
//         `);
//       }
//     }

// });
