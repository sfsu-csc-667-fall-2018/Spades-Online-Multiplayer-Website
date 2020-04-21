const socketIo = require('socket.io');

const init = (app, server) => {
  const io = socketIo(server);

  app.set('io', io);

  io.on('connection', socket => {
    console.log('connected to socket io');

    socket.on('disconnected', data => {
        console.log('disconnected from socket io');
    })
  });
}

module.exports = { init };