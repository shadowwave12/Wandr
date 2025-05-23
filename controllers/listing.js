const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.showRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing doesnot exist");
    return res.redirect("/listings");
  }
  console.log(listing);

  res.render("listings/show.ejs", { listing });
};

module.exports.create = async (req, res, next) => {
  // // try {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "new listing created");
  res.redirect("/listings");
  // } catch (err) {
  //   next(err);
  // }
};
module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing doesnot exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};
module.exports.update = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "send valid data for listing");
  }
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "updated successfully");

  res.redirect(`/listings/${id}`);
};
module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", " listing deleted");
  console.log(deletedListing);
  res.redirect("/listings");
};
