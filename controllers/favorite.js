const asyncHandler = require("express-async-handler");

const Favorite = require("../models/favorite");

exports.addPlaceToFavorites = asyncHandler(async (req, res) => {
  const { place } = req.body;

  const favorite = await Favorite.create({
    user: req.user._id,
    place: place,
  });

  if (favorite) {
    res.status(201).json(favorite);
  } else {
    res.status(400);
    throw new Error("No se pudo añadir el lugar a favoritos");
  }
});

exports.getMyPlacesFromFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id })
    .populate("place")
    .sort({ createdAt: -1 });

  res.json(favorites);
});

exports.getMyPlaceFromFavoritesById = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    user: req.user._id,
    place: req.params.id,
  });

  res.json(favorite);
});

exports.deletePlaceFromFavorites = asyncHandler(async (req, res) => {
  const favoriteExists = await Favorite.findOne({
    user: req.user._id,
    place: req.params.id,
  });

  if (!favoriteExists) {
    res.status(404);
    throw new Error("Lugar favorito no encontrado");
  }

  await Favorite.findByIdAndRemove(favoriteExists._id);

  res.json({ message: "Lugar eliminado de favoritos" });
});
