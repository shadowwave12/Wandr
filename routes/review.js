const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//DELETE ROUTE
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { reviewId } = req.params;
    let reviewRef = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    let deletedReview = await Review.findByIdAndDelete(reviewId);
    req.flash("success", " review deleted");
    console.log("deleted review :", deletedReview);
    res.redirect(`/listings/${id}`);
  })
);

//REVIEW ROUTE
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "new review added");

    // res.send("new review saved");
    res.redirect(`/listings/${listing._id}`);
  })
);

module.exports = router;
