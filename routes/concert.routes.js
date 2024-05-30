const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert.model")
const app = express();



router.get("/", (req, res, next) => {
  Concert.find()
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
  .then( (response) => {
    res.json(response)
  })
  .catch( error => {
    next(error)
  })

});

router.post("/", (req, res, next) => {
  Concert.create(req.body)
  .then ( response => {
    res.json(response);
  })  
  .catch (error => {
    next(error)
  }) 
});

router.put("/", (req, res, next) => {
  Concert.findByIdAndUpdate(req.body._id, req.body, { new: true })
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

router.delete("/:concertId", (req, res, next) => {
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

const errorHandler = require("../error-handling/index");
app.use(errorHandler);

module.exports = router;


