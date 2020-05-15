const socket = io();

let user, room;

$(window).on('load', () => {
  socket.emit('entered', {
    roomId: $('#room_id').val(),
    user: $('#name').val()
  });
});

$(document).ready(() => {

  user = $('#name').val();
  room = $('#room_id').val();


  //send statuses/messages
  //typing function under construction
  /*$('#message').keypress(event => { 
    if( $('#message').val() != '' && event.code == 'Enter' ){
      const message = $('#message').val();
      const room = $('#room_id').val();
      const user = $('#name').val();
  
      socket.emit('send', { 
        room: room,
        message: `${user} : ${message}` 
      });
    }else{
      socket.emit('typing', {
        room: $('#room').val(),
        user: $('#name').val() 
      })
    }
  });*/

  $('#chat-form').submit(() => {
    const message = $('#message').val();

    socket.emit('send', {
      roomId: room,
      message: `${user} : ${message}`
    });

    $('#message').val('');
    return false;
  });

  socket.on('send message', data => {
    const { roomId, message } = data;
    if (room == roomId) {
      $('#messages').append($('<li>').text(message));
    }
  });

  //listen for responses
  socket.on('entered message', data => {
    const { roomId, user } = data;

    const enteredLobby = ' has entered the Lobby';
    const enteredGame = ' had entered the Game Room';

    if (room == roomId) {
      if (room == 0) {
        $('#messages').append($('<li>').text(user + enteredLobby));
      } else {
        $('#messages').append($('<li>').text(user + enteredGame));
      }
    }

  });

  socket.on('typing message', data => {
    const { roomId, user } = data;

    if (roomId == room) {
      $('#messages').append($('<li>').text(user + ' typing message...'));
    }
  });
});