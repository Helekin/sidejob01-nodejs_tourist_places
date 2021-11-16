const express = require("express");
const router = express.Router();

const { protection } = require("../middleware/auth");

const favoriteController = require("../controllers/favorite");

router.get("/me", [protection], favoriteController.getMyFavorites);

router.post("/", [protection], favoriteController.addToFavorites);

router.delete("/:id", [protection], favoriteController.deleteFromFavorites);

module.exports = router;
