const express = require("express");
const paymentController = require("../controller/payment.controller");
const router = express.Router();

router.post("/checkout/:id",paymentController.paymentCheckout);
router.post("/paymentverification",paymentController.paymentVerification);
router.post("/updatepaymentinfo",paymentController.updatePaymentInformation);
router.get("/getkey",paymentController.send_key);

module.exports = router;