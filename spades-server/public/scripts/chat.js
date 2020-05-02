const { TYPING, CHAT, ENTERED, TYPING_MESSAGE, ENTRY_MESSAGE, SEND_MESSAGE } = require('../../socket/constants');
const socket = io();

//get DOM elements
let message = document.getElementById('message'),
    room = document.getElementById('room_id'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//grab info when window opens
window.addEventListener('load', () => {
  console.log('window loaded');
  socket.emit(ENTERED, {
    room_id: room.value,
    handle: username
  });
});

//listen for chat submit 
btn.addEventListener('click', () => {
  socket.emit(CHAT, {
    room_id: room.value,
    message: message.value,
    handle: username
  };)

  message.value = '';
});

//check keypress
message.addEventListener('keypress', () => {
  if (msg.value != '' && events.code == 'Enter') {
    socket.emit(CHAT, {
      room_id: room.value,
      message: msg.value,
      handle: username
    });
    msg.value = '';
  } else {
    socket.emit(TYPING, {
      room_id: room.value,
      handle: username
    });
  }
});

//event listeners 
socket.on(SEND_MESSAGE, data => {
  const { room_id, handle, message } = data;

  if (room.value = room_id){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + handle + ': </strong>' + message + '</p>';
  }
});

socket.on(ENTRY_MESSAGE, data => {
  const { room_id, handle } = data;

  if (room.value == room_id) {
    if (room.value == 0) {
      output.innerHTML +=
        '<p><em>' + handle + ' has entered the lobby!</em></p>';
    } else {
      output.innerHTML += '<p><em>' + handle + ' has entered the gameroom!</em></p>';
    }
  }
});

socket.on(TYPING_MESSAGE, data => {
  const { room_id, handle } = data;

  if (room.value == room_id) {
    feedback.innerHTML = '<p><em>' + handle + ' is typing...</em></p>';
  }
});