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

router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isloggedIn, listingController.newRoute);

//Show Route
router.get("/:id", wrapAsync(listingController.showRoute));

//Create Route
router.post(
  "/",
  isloggedIn,
  validateListing,
  wrapAsync(listingController.create)
);

//Edit Route
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(listingController.edit));

//Update Route
router.put(
  "/:id",
  isloggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.update)
);

//Delete Route
router.delete("/:id", isloggedIn, isOwner, wrapAsync(listingController.delete));

module.exports = router;
