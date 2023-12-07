const express = require("express");
const router = express.Router();

const addressController = require("../controller/address.controller");

router.post("/address", addressController.DeleveryAddress);
router.get("/checkoutItem",addressController.userCartProduct);
router.get("/userAddress",addressController.userAddress);
router.put("/selectAddress",addressController.selectAddress);
router.get("/orderSummaryAdd",addressController.getOrderSummaryAdd);
module.exports = router;
