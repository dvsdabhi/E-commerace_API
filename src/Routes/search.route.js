const express = require("express");
const router = express.Router();

const searchController = require("../controller/search.controller");

router.get("/search/percentage/:discount", searchController.discount_range);
router.get("/search/price/:price", searchController.price_range);

module.exports = router;
