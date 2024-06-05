const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//Get all users: 
router.get("/", (req, res, next) => {
  User.find( {}, '-password')
    .then(response => {
     
      res.json(response);
    })
    .catch(error => {
      next(error);
    });
});


//Should we add the middleware to protect the route? 
router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
  .populate('followedArtists', 'name artistConcerts artistDescription artistGenre picture groupName')
  .populate('bookmarkedEvents', 'date city image description prices title')
  .populate({
    path: 'conversations',
    populate: {
      path: 'participants',
      select: 'name picture'
    },
    select: 'participants' 
  })
  .then ( response => {
    if (response) {
      console.log(response.conversations[0])
      const { password, ...newResponse } = response.toObject();

    res.json(newResponse);
    } else {
    res.json(null)
    }
  })  
  .catch (error => {
    next(error)
  })
});

router.put("/", (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, req.body.userInfo, {new:true})
  .then( (response) => {
    console.log("Respuesta del put:", response)
    if (response) {
      res.status(200).json(response)
      return
    }
    else {
      res.status(400)
      return
    }
  })
  .catch( (error) => {
    next(error)
  })
})

router.put("/bookmark", ( (req, res, next) => {
  const {action, userId, property, newElement,} = req.body;
  User.findByIdAndUpdate (userId, {[action]: {[property]: newElement}  }, { new: true} )
    .then( response => {
      if (response) {
      res.json(response) }
      else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(error => {
      console.error("Unable to update", error);
      next(error)
    })

  }))

  router.put("/add-conversation", (req, res, next) => {
    const {userId, userId2, conversationId} = req.body
  
    User.updateMany(
      { _id: { $in: [userId, userId2] } },
      { $push: { conversations: conversationId } },
      { new: true }
    )
      .then((response) => {
        console.log("Respuesta", response.matchedCount)
        if (response.matchedCount === 2) {
          res.json({ message: "Usuarios actualizados correctamente" });
        } else {
          res.status(404).json({ error: "Usuarios no encontrados" });
        }
      })
      .catch((error) => {
        console.error("Error al actualizar usuarios", error);
        next(error);
      });
  });
  

module.exports = router;
