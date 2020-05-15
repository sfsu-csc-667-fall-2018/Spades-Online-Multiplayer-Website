io = require('socket.io')();

io.on('connection', socket => {
  
  console.log('connected to server socket');

  socket.on('entered', data => {  
    io.emit('entered message', data);
  });

  socket.on('typing', data => {
    io.emit('typing message', data);
  });

  socket.on('disconnect', data => {
    console.log('disconnected from socket io');
  });

  socket.on('send', data => {
    io.emit('send message', data)
  });
});


module.exports = io;
