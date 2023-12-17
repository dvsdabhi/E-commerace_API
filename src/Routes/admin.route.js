const express = require("express");
const adminController = require("../controller/admin.controller");
const router = express.Router();

router.post("/admin/add/product",adminController.addProduct);
router.get("/admin/product",adminController.getProduct);
router.get("/admin/get/single/product/:id",adminController.getSingleProduct);
router.delete("/admin/product/:product_Id",adminController.deleteProduct);
router.delete("/admin/order/:order_Id",adminController.deleteProduct);
router.get("/admin/orders/",adminController.viewOrder);


// router.post("/signin",authController.login);

module.exports = router;