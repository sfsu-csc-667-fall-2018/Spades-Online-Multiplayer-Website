io = require('socket.io')();

io.on("connection", socket => {
  socket.on("typing", data => {
    socket.broadcast.emit("typing message", data);
  });

  socket.on("chat", data => {
    io.emit("send message", data);
  });
});


module.exports = io;