const socketIo = require('socket.io');

const init = (app, server) => {
  const io = socketIo(server);

  app.set('io', io);

  io.on('connection', socket => {
    console.log('connected to socket io');

    socket.on('disconnect', data => {
        console.log('disconnected from socket io');
    })

    socket.on( USER_JOINED, data => io.emit( USER_JOINED, data ))
    socket.on( MESSAGE_SEND, data => io.emit( MESSAGE_SEND, data ))
  });
}

module.exports = { init };