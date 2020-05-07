io = require('socket.io')();

io.on('connection', socket => {
  
  console.log('connected to socket io')

  socket.on('disconnect', data => {
    console.log('disconnected from socket io');
  });

  socket.on('send message', (message) => {
    io.emit('send message', message)
  });
});


module.exports = io;
