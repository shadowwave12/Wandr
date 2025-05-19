const express = require("express");
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new user({ username, email });
      const registerdUser = await user.register(newUser, password);
      console.log(registerdUser);
      res.redirect("/listings");
      req.flash("success", "Welcome to WandR");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "welcome back");
    res.redirect("/listings");
  }
);
router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged Out");
    res.redirect("/listings");
  });
});

module.exports = router;
