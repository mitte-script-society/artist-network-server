const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert.model")
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.get("/", (req, res, next) => {
  Concert.find()
  .populate('artist', 'name groupName picture _id')
  .then ( response => {
    res.json({ elements: `Elements in list: ${response.length}`, list: response });
  })  
  .catch (error => {
    next(error)
  })
});

router.get("/:idConcert", (req, res, next) => {
  const {idConcert} = req.params
  Concert.findById(idConcert)
  .populate('artist', 'name groupName picture _id city artistFee')
  .then( (response) => {
    res.json(response)
  })
  .catch( error => {
    next(error)
  })

});

router.post("/", isAuthenticated, (req, res, next) => {
  Concert.create(req.body)
  .then ( response => {
    res.json(response);
  })  
  .catch (error => {
    next(error)
  }) 
});

router.put("/:concertId", isAuthenticated, (req, res, next) => {
  Concert.findByIdAndUpdate(req.params.concertId, req.body, { new: true })
  .then( response => {
    if (response) {
      res.json( ["Element edited", response]) }
      else {
        res.json(["Element not found", null])
      }
  })
  .catch( error =>{
    next(error)

  })
});

router.delete("/:concertId", isAuthenticated, (req, res, next) => {
  const {concertId} = req.params

 Concert.findByIdAndDelete(concertId)
  .then ( response => {
    if (response) {
      res.json("Element Deleted")

    } else {
      res.json("Element not found")
    }
    
  })  
  .catch (error => {
    next(error)
  }) 
});

router.post("/upload", isAuthenticated, fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ fileUrl: req.file.path });
});



module.exports = router;


