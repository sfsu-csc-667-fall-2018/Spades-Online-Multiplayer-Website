const socket = io();

$('form').submit(() => {
  const message = $('#message').val();
  const room = $('#room_id').val();
  const user = $('#name').val();

  socket.emit('send message', `${user} : ${message}`);
  $('#message').val('');
  return false;
});

socket.on('send message', (message) => {
  $('#messages').append($('<li>').text(message));    
});