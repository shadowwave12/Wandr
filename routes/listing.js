const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");
const { equal } = require("joi");
const listingController = require("../controllers/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  // .post(isloggedIn, validateListing, wrapAsync(listingController.create));
  .post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
  });

//New Route
router.get("/new", isloggedIn, listingController.newRoute);

router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .put(
    isloggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingController.delete));

//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;
