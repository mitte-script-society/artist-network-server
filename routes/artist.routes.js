const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary.config");

// get all artists

  router.get("/", (req, res, next) => {
    User.find({isArtist: true})
    .then ( response => {
      res.json(response);
    })  
    .catch (error => {
      next(error)
    })
  });

  // get one artist by ID

  router.get("/:artistId", (req, res, next) => {
    const {artistId} = req.params
    User.findById(artistId)
    .then( (foundArtist) => {
    const { name, _id, artistFee, artistDescription, city, picture, artistGenre, artistVideos, artistAudio, artistWebsite} = foundArtist;
        // Create a new object that doesn't expose the password
    const artist = { name, _id, artistFee, artistDescription, picture, city, artistGenre, artistVideos, artistAudio, artistWebsite};

      res.json(artist)
    })
    .catch( error => {
      next(error)
    })
});
  

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ fileUrl: req.file.path });
});


module.exports = router;


