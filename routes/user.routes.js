const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

router.get("/:userId", (req, res, next) => {
  console.log("calling to get in route /user")
  User.findById(req.params.userId)
  .then ( response => {
    if (response) {
      console.log(response)
    const newResponse = {
      name: response.name,
      picture: response.picture,
      city: response.city,
      isArtist: response.isArtist,
      moreThanOne: response.moreThanOne,
      groupName: response.groupName,
      artistMembers: response.artistMembers,
      artistFee: response.artistFee,
      artistDescription: response.artistDescription,
      artistPictures: response.artistPictures,
      artistVideos: response.artistVideos,
      artistAudio: response.artistAudio,
      artistGenre: response.artistGenre,
    }
    
    res.json(newResponse);
    }
  
  })  
  .catch (error => {
    next(error)
  })
});

router.put("/", (req, res, next) => {
  
  console.log("Info recieved", req.body)
  
  User.findByIdAndUpdate(req.body.userId, req.body.userInfo, {new:true})
  .then( (response) => {
    console.log(response)
    if (response) {
      res.status(200).json("Successful")
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

module.exports = router;
