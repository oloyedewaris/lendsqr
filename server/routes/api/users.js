const express = require("express");
const usersController = require("../../controllers/users.js");
const router = express.Router();

const auth = require("../../middleWare/auth");

// // Users Routes // //

//Changing of user data routes

//@route post --api/users/settings:id
//@description --change user data
//@access --public
router.post("/settings/:id", auth, usersController.settings);

module.exports = router;
