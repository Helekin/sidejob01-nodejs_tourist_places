const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    review: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "places",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    userAvatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
