const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.model")


router.post("/newConversation", (req, res, next) => {
  Conversation.create(req.body)
  .then( response => {
    res.json(response)
  })

  .catch (error => {
    next(error)
  })

})

//Write new message: finds the conversation and pushes message into the new array
router.put("/createMessage", (req, res, next) => {
  const {conversationId, newMessage} = req.body
  console.log()

  Conversation.findByIdAndUpdate(conversationId,
    {"$push": {messages: newMessage} }, { new: true}
  )
  .then ( response => {
    res.json(response);
  })  
  .catch (error => {
    next(error)
  })
});

// get all the messages of one conversation
router.get("/:conversationId", (req, res, next) => {
  Conversation.findById(req.params.conversationId)
      .populate({
          path: 'messages.sender',
          select: 'name picture' 
      })
      .then(response => {
          res.json(response);
      })
      .catch(error => {
          next(error);
      });
});

  


module.exports = router;


