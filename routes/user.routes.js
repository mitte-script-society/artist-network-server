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
    select: 'participants updatedAt'
  })
  .then(response => {
    if (response) {
      const { password, ...newResponse } = response.toObject();
      // Convert the Map (notifications) to an object
      const notificationsObject = {};
      response.notifications.forEach((value, key) => {
        notificationsObject[key] = value;
      });
      newResponse.notifications = notificationsObject;
      res.json(newResponse);
    } else {
      res.json(null);
    }
  })
  .catch(error => {
    next(error);
  });
});


router.put("/", (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, req.body.userInfo, {new:true})
  .then( (response) => {
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


router.put("/add-notification/:userId", (req, res, next) => {
    const { userId } = req.params;
    const { idOrigin, notificationType } = req.body;
  
    User.findById(userId)
      .then( user => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        if (user.notifications.has(idOrigin)) {
          // Increment the quantity if the notification exists
          user.notifications.get(idOrigin).quantity += 1;
        } else {
          // Add a new notification if it doesn't exist
          user.notifications.set(idOrigin, {
            quantity: 1,
            notificationType: notificationType // or 'request', depending on your logic
          });
        }
       // Save the updated user document
        return user.save();
      })
      .then((response) => {
        console.log(response.notifications)
        res.json(response);
      })
      .catch(error => {
        console.error("Internal error", error);
        next(error);
      });
  });  

router.put("/remove-notification/:userId", (req, res, next) => {
    const { userId } = req.params;
    const { idOrigin} = req.body;
    User.findById(userId)
      .then( user => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (user.notifications.has(idOrigin)) {
          user.notifications.delete(idOrigin)
        }
        return user.save();
      })
      .then((response) => {
        console.log(response.notifications)
        res.json(response);
      })
      .catch(error => {
        console.error("Internal error", error);
        next(error);
      });
  });  



module.exports = router;
