const express = require("express");
const router = express.Router();

const { protection } = require("../middleware/auth");

const reviewController = require("../controllers/review");

router.get("/rating", reviewController.getTopPlaces);

router.get("/rating/:id", reviewController.getTotalRatingByPlaceId);

router.get("/", reviewController.getReviews);

router.get("/:id", reviewController.getReviewsByPlaceId);

router.get("/me/:id", [protection], reviewController.getMyReviewByPlaceId);

router.post("/", [protection], reviewController.createReview);

router.delete("/:id", [protection], reviewController.deleteMyReview);

module.exports = router;
