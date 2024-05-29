const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

//This route only gets all the elements of Users
router.get("/", (req, res, next) => {

  User.find()
  .then ( response => {
    res.json({ elements: `Elements in list: ${response.length}`, list: response });
  })  
  .catch (error => {
    console.log("buuuuuuu!")
  })
});

module.exports = router;
