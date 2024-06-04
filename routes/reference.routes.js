const express = require("express");
const router = express.Router();
const Reference = require("../models/Reference.model")
const fileUploader = require("../config/cloudinary.config");

//reciever, sender, date, content

router.post("/", (req, res, next) => {
  Reference.create(req.body)
  .then ( response => {
    res.status(200).json(response)
  })
  .catch((err) => next(err));
});

//Editing a given reference
router.put("/:idReference", (req, res, next) => {
  Reference.findByIdAndUpdate(req.params.idReference, req.body, {new: true})
  .then ( response => {
    res.status(200).json(response)
  })
  .catch((err) => next(err));
});

//Get all references filtered by userId (all references from artist X)
router.get("/:idUser", (req, res, next) => {
    const idUser = req.params.idUser;
    Reference.find({receiver: idUser})
    //.populate('sender', 'name picture city')
    .then ( response => {
      res.json(response);
    })  
    .catch (error => {
      next(error)
    })
  });


//Delete 
router.delete("/:idReference", (req, res, next) => {    
  Reference.findByIdAndDelete(req.params.idReference)
    .then ( response => {
      res.json(response);
    })  
    .catch (error => {
      next(error)
  })
});

//Getting one by reference
router.get("/onlyOne/:idReference", (req, res, next) => {
  Reference.findById(req.params.idReference)
  .then ((response) => {
    res.json(response)
  })
  .catch (error => next(error))
})



module.exports = router;