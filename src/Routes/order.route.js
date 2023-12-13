const express = require("express");
const orderController = require("../controller/order.controller");
const router = express.Router();

router.post("/order/createOrder", orderController.create_Order);
router.get("/order/getOrder",orderController.get_Order);
router.get("/order/:id1/:id2",orderController.order_details);
module.exports = router;