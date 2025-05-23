const express = require("express");
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router.get("/signup", userController.signupForm);

router.post("/signup", wrapAsync(userController.postSignupForm));

router.get("/login", userController.loginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.postLoginForm
);
router.get("/logout", userController.logout);

module.exports = router;
