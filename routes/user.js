const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl } = require("../middlware.js");
const userController = require("../controller/user.js");

//logout route
router.get("/logout",userController.logout);

// below  i am definig signup get and post request using router.route method ka use karke 
router.route("/signup")
.get(wrapAsync(userController.renderSignupform))
.post(wrapAsync(userController.signup));

// now we are going to combine login get and post route 
router.route("/login")
.get(wrapAsync(userController.renderloginform))
.post(saveRedirectUrl ,passport.authenticate("local", { 
    failureRedirect:"/login", 
    failureFlash: true,}),
    userController.login );



module.exports = router;