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
    console.log("Setup action recieved", userData)
    //socket.join(userData);
    socket.emit('connected')
  });


  socket.on ("new message", (newMessageRecieved) => {
    console.log("message recieved in socket:", newMessageRecieved)
    io.emit("new message", newMessageRecieved )
  })

  socket.on ("user typing", (typingInfo) => {
    io.emit("user typing", typingInfo)
  })
  
  
})



