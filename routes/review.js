const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  isloggedIn,
  isOwner,
  validateReview,
  isAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//DELETE ROUTE
router.delete(
  "/:reviewId",
  isloggedIn,
  isAuthor,
  wrapAsync(reviewController.delete)
);

//REVIEW ROUTE
router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewController.review)
);

module.exports = router;
