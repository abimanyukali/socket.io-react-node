import { Server } from 'socket.io';
const io = new Server({
  cors: {
    origin: 'http://localhost:5173',
  },
});
let onlineUsers = [];
const addNewUser = (username, socketId) => {
  if (username) {
    !onlineUsers.some((user) => user.username === username) &&
      onlineUsers.push({ username, socketId });
    console.log(onlineUsers);
  }
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log(onlineUsers);
};
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  console.log('someone has connected!');

  socket.on('newUser', (username) => {
    addNewUser(username, socket.id);
  });
  socket.on('sendNotification', ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit('getNotification', {
      senderName,
      type,
    });
  });
  socket.on('sendText', ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit('getText', {
      senderName,
     text
    });
  });
  socket.on('disconnect', () => {
    console.log('someone had left');

    removeUser(socket.id);
  });
});
io.listen(8080);
