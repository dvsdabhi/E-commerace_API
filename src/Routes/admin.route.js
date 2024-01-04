const express = require("express");
const adminController = require("../controller/admin.controller");
const router = express.Router();

router.get("/admin/product", adminController.getProduct);
router.get("/admin/get/single/product/:id", adminController.getSingleProduct);
router.get("/admin/users", adminController.allUser);
router.get("/admin/orders/", adminController.viewOrder);
router.get("/admin/product/:lavelOne/:lavelThree", adminController.getCategoryProduct);
router.post("/admin/add/product", adminController.addProduct);
router.put("/admin/orders/status/:order_Id", adminController.changeOrderStatus);
router.put("/admin/product/update/:product_Id", adminController.updateProduct);
router.delete("/admin/product/:product_Id", adminController.deleteProduct);
router.delete("/admin/order/:order_Id", adminController.deleteOrder);
router.get("/admin/dresses", adminController.AllDresses);
router.get("/admin/sarees", adminController.AllSarees);
router.get("/admin/similarproduct/:id", adminController.SimilarProduct);

// router.post("/signin",authController.login);

module.exports = router;
