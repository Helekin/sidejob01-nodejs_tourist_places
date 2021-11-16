const express = require("express");
const router = express.Router();

const { protection } = require("../middleware/auth");

const reviewController = require("../controllers/review");

router.get("/", reviewController.getReviews);

router.get("/me/:id", [protection], reviewController.getMyReview);

router.post("/", [protection], reviewController.createReview);

router.delete("/:id", [protection], reviewController.deleteMyReview);

module.exports = router;
