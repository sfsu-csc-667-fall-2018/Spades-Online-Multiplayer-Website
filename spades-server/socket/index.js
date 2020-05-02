const socketIo = require('socket.io');
const { ENTERED, ENTRY_MESSAGE, SEND_MESSAGE, CHAT, TYPING, TYPING_MESSAGE } = require('./constants');

const init = (app, server) => { 

  const io = socketIo(server);
  app.set('io', io);

  io.on('connection', socket => {
    console.log('connected to socket io');

    socket.on('disconnect', data => {
        console.log('disconnected from socket io');
    });

    socket.on( ENTERED, data => io.emit( ENTRY_MESSAGE, data ));
    socket.on( CHAT, data => io.emit( SEND_MESSAGE, data ));
    socket.on( TYPING, data => socket.broadcast.emit(TYPING_MESSAGE, data) );
  });
};

module.exports = { init };