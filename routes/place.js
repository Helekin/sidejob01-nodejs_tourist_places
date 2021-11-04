const express = require("express");
const router = express.Router();

const { protection, isAdmin } = require("../middleware/auth");

const placeController = require("../controllers/place");

router.post("/", [protection, isAdmin], placeController.createPlace);

router.put("/:id", [protection, isAdmin], placeController.updatePlace);

router.delete("/:id", [protection, isAdmin], placeController.deletePlace);

router.get("/", placeController.getAllPlaces);

router.get("/:id", placeController.getPlaceById);

module.exports = router;
