const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";


const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: FRONTEND_URL
  }
})

io.on('connection', (socket) => {
  console.log('connected to socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData);
    socket.emit('connected')
  });

  socket.on("join chat", (room) => {
    socket.join(room); 
    console.log("user joined room:" + room)
  })

  socket.on ("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat

  })
  
})



