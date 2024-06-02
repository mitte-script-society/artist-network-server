const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { trusted } = require("mongoose");

//Should we add the middleware to protect the route? 
router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
  .populate('followedArtists', 'name artistConcerts artistDescription artistGenre picture groupName')
  .populate('bookmarkedEvents', 'date city image description prices')
  .then ( response => {
    if (response) {
    const { password, ...newResponse } = response.toObject(); //This line extracts the properties of response, but password.
  
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


module.exports = router;
