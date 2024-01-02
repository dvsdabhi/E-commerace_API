const express = require("express");
const reviewController = require("../controller/review.controller");
const router = express.Router();

router.post("/rating/:product_id",reviewController.AddRating);
router.get("/totalRating/:product_id",reviewController.TotalRating);
router.post("/review/:product_id",reviewController.AddReview);
router.get("/totalReview/:product_id",reviewController.TotalReview);

module.exports = router;