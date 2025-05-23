const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let { reviewId } = req.params;
  let reviewRef = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  let deletedReview = await Review.findByIdAndDelete(reviewId);
  req.flash("success", " review deleted");
  console.log("deleted review :", deletedReview);
  res.redirect(`/listings/${id}`);
};
module.exports.review = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "new review added");

  // res.send("new review saved");
  res.redirect(`/listings/${listing._id}`);
};
