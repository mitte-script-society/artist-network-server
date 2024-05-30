const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert.model")

router.get("/", (req, res, next) => {
  Concert.find()
  .then ( response => {
    res.json({ elements: `Elements in list: ${response.length}`, list: response });
  })  
  .catch (error => {
    console.log("Error", error)
  })
});

router.get("/:idConcert", (req, res, next) => {
  const {idConcert} = req.params
  Concert.findById(idConcert)
  .then( (response) => {
    res.json(response)
  })
  .catch( error => {
      console.log(error)
  })

});

router.post("/", (req, res, next) => {
  Concert.create(req.body)
  .then ( response => {
    res.json(response);
  })  
  .catch (error => {
    console.log("Error in Data Base", error)
  }) 
});

router.put("/", (req, res, next) => {
  Concert.findByIdAndUpdate(req.body._id, req.body, { new: true })
  .then( response => {
      res.json(response)
  })
  .catch( error =>{
    res.json("Error", error)
  })
});

router.delete("/", (req, res, next) => {
 Concert.findByIdAndDelete(req.body._id)
  .then ( response => {
    res.json("Element Deleted");
  })  
  .catch (error => {
    console.log("buuuuuuu!")
  }) 
});

module.exports = router;


