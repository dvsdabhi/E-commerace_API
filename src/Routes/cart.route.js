const express = require("express");
const {
  addTocart,
  getCartItemProduct,
  getCartDelete,
  GetProductQty,
} = require("../controller/cart.controller");
const router = express.Router();

router.post("/cart", addTocart);
router.get("/cartitem", getCartItemProduct);
router.delete("/cartitem/:item_Id", getCartDelete);
router.put("/cartitem/:product_Id", GetProductQty);

module.exports = router;
