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

const userSockets = new Map();

io.on('connection', (socket) => {
  
  console.log('CONNECTED!')

  socket.on ("create-user-room", (userId) => {
    console.log("user-room created:", userId)
    socket.join(userId);
  })

  socket.on('sendNotification', ({ idConversation, senderId, recipientId, message }) => {
    console.log("got notification request")
    const recipientRoom = recipientId
    const rooms = io.sockets.adapter.rooms;
    if (rooms.has(recipientRoom)) {
      console.log("User found")
      io.to(recipientRoom).emit('getNotification', { idConversation, recipientId, message});
    } else {
      console.log("No user found")
        return
      }
  });

  socket.on ("join-chat", (chatId) => {
    //List of existing rooms:  
    const rooms = io.sockets.adapter.rooms;
    
    //Evaluate if a socket with this chat_id already exists: 
    if (rooms.has (chatId)) {
      console.log("romm already exists. Appending user to this chatroom")
      socket.join(chatId)

      //We emmit a signal to both users, so they know that the counterpart is online
      io.to(chatId).emit('other-joined'); 

    } else {
      //We create the new room. In client, isOtherOnline will remain false
      socket.join(chatId)
      console.log("New chat created")
    }

  })

  socket.on('leave-chat', (chatId) => {
    console.log("Leaving chat", chatId)
    socket.leave(chatId);
    socket.to(chatId).emit('other-left');
  });

  socket.on ("new message", ( {destiny, newMessage}) => {
    console.log("destiny:", destiny)
    console.log("message:", newMessage)
    socket.to(destiny).emit("new message", newMessage)
  })

  socket.on ("user typing", (destiny) => {
    socket.to(destiny).emit("user typing")
  })

  socket.on('disconnect', () => {
    console.log('DISCONNECTED!')
  });
  
})


