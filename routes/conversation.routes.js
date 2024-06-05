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

// get all the messages of one conversation => populate of sender not needed
router.get("/messages/:conversationId", (req, res, next) => {
  Conversation.findById(req.params.conversationId, '-participants -_id')
      .then(response => {
          res.json(response);
      })
      .catch(error => {
          next(error);
      });
});

  


module.exports = router;


