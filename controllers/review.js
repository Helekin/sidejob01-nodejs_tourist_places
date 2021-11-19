const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Review = require("../models/review");
const Place = require("../models/place");

exports.createReview = asyncHandler(async (req, res) => {
  const { title, review, rating, place } = req.body;

  const myReview = await Review.create({
    user: req.user._id,
    title,
    review,
    rating,
    place,
  });

  if (myReview) {
    res.status(201).json(myReview);
  } else {
    res.status(400);
    throw new Error("La reseña no pudo ser creada");
  }
});

exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate("user", "image");

  res.json(reviews);
});

exports.getMyReviewByPlaceId = asyncHandler(async (req, res) => {
  const review = await Review.findOne({
    place: req.params.id,
    user: req.user._id,
  });

  res.json(review);
});

exports.getReviewsByPlaceId = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ place: req.params.id }).populate(
    "user",
    "image"
  );

  res.send(reviews);
});

exports.getTopPlaces = asyncHandler(async (req, res) => {
  const review = await Review.aggregate([
    {
      $group: {
        _id: "$place",
        avgRating: { $avg: "$rating" },
      },
    },
  ]).limit(5);

  const placesId = [];

  review.forEach((element) => {
    placesId.push(element._id);
  });

  const places = await Place.aggregate([
    { $match: { _id: { $in: placesId } } },
  ]);

  res.json(places);
});

exports.getTotalRatingByPlaceId = asyncHandler(async (req, res) => {
  const review = await Review.aggregate([
    { $match: { place: mongoose.Types.ObjectId(req.params.id) } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (review.length > 0) {
    res.json(review[0]);
  } else {
    res.json({
      _id: null,
      avgRating: 0,
    });
  }
});

exports.deleteMyReview = asyncHandler(async (req, res) => {
  const reviewExists = await Review.findOne({ _id: req.params.id });

  if (!reviewExists) {
    res.status(404);
    throw new Error("Reseña no encontrada");
  }

  if (reviewExists.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("No se puede eliminar la reseña de otro usuario");
  }

  await Review.findByIdAndRemove(reviewExists._id);

  res.json({ message: "Reseña eliminada con éxito" });
});
