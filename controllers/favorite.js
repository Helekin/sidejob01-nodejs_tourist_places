const asyncHandler = require("express-async-handler");

const Favorite = require("../models/favorite");

exports.addToFavorites = asyncHandler(async (req, res) => {
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

exports.getMyFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id });

  res.json(favorites);
});

exports.deleteFromFavorites = asyncHandler(async (req, res) => {
  const favoriteExists = await Favorite.findOne({
    _id: req.params.id,
  });

  if (!favoriteExists) {
    res.status(404);
    throw new Error("Lugar favorito no encontrado");
  }

  if (favoriteExists.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("No se puede borrar el lugar favorito de otro usuario");
  }

  await Favorite.findByIdAndRemove(favoriteExists._id);

  res.json({ message: "Lugar eliminado de favoritos" });
});
