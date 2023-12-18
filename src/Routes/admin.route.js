const express = require("express");
const adminController = require("../controller/admin.controller");
const router = express.Router();

router.post("/admin/add/product", adminController.addProduct);
router.get("/admin/product", adminController.getProduct);
router.get("/admin/get/single/product/:id", adminController.getSingleProduct);
router.delete("/admin/product/:product_Id", adminController.deleteProduct);
router.delete("/admin/order/:order_Id", adminController.deleteOrder);
router.get("/admin/orders/", adminController.viewOrder);
router.put("/admin/orders/status/:order_Id", adminController.changeOrderStatus);
router.get("/admin/users", adminController.allUser);

// router.post("/signin",authController.login);

module.exports = router;
