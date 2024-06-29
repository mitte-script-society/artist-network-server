const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.model")


router.post("/create-conversation", (req, res, next) => {

  Conversation.create(req.body)
  .then( response => {
    res.json(response)
  })
  .catch (error => {
    next(error)
  })
})

router.put("/createMessage/:conversationId", (req, res, next) => {
  const {conversationId} = req.params;
  Conversation.findByIdAndUpdate(conversationId,
    {"$push": {messages: req.body} }, { new: true}
  )
  .then ( response => {
    res.json(response);
  })  
  .catch (error => {
    next(error)
  })
});

router.get("/messages/:conversationId", (req, res, next) => {
  const { conversationId } = req.params;
  const { numberRequestedMessages } = req.query;
  Conversation.findById(conversationId, '-participants -_id')
      .then(response => {
          console.log("Response:", response.messages.length)
          const lastMessages = response.messages.slice( - Number(numberRequestedMessages))
          res.json(lastMessages);
      })
      .catch(error => {
          next(error);
      });
});

  


module.exports = router;


