const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedredirectUrl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");


router.route("/signup").get(usercontroller.renderSignupForm)
.post(wrapAsync (usercontroller.signup));

router.route("/login").get(usercontroller.renderLoginForm)
.post(savedredirectUrl,
    passport.authenticate("local",{
        failureRedirect :"/login",
        failureFlash :true,
    }),
    usercontroller.login
);
router.get("/logout", usercontroller.logOut);

module.exports = router;
