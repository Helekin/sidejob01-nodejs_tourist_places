const asyncHandler = require("express-async-handler");

const Review = require("../models/review");

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

exports.getMyReview = asyncHandler(async (req, res) => {
  const reviewExists = await Review.findOne({ _id: req.params.id });

  if (!reviewExists) {
    res.status(404);
    throw new Error("Reseña no encontrada");
  }

  if (reviewExists.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("No se puede mostrar la reseña de otro usuario");
  }

  res.json(reviewExists);
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
