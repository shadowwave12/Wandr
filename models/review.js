const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
