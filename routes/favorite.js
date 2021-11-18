const express = require("express");
const router = express.Router();

const { protection } = require("../middleware/auth");

const favoriteController = require("../controllers/favorite");

router.get("/me", [protection], favoriteController.getMyPlacesFromFavorites);

router.get("/me/:id", [protection], favoriteController.getMyPlaceFromFavoritesById);

router.post("/", [protection], favoriteController.addPlaceToFavorites);

router.delete(
  "/:id",
  [protection],
  favoriteController.deletePlaceFromFavorites
);

module.exports = router;
