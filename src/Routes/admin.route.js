const express = require("express");
const adminController = require("../controller/admin.controller");
const router = express.Router();

router.post("/admin/add/product",adminController.addProduct);
router.get("/admin/get/product",adminController.getProduct);
router.get("/admin/get/single/product/:id",adminController.getSingleProduct);
// router.post("/signin",authController.login);

module.exports = router;