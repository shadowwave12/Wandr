const user = require("../models/user");

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.postSignupForm = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new user({ username, email });
    const registerdUser = await user.register(newUser, password);
    console.log(registerdUser);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/listings");
      req.flash("success", "Welcome to WandR");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.postLoginForm = async (req, res) => {
  req.flash("success", "welcome back");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged Out");
    res.redirect("/listings");
  });
};
