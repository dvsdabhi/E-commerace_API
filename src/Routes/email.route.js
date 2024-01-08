const express = require("express");
const router = express.Router();
const emailController = require("../controller/email.controller.js");

router.post("/send-otp-email",emailController.send_pwd_otp_email);
router.post("/verify-otp",emailController.verify_otp);

module.exports = router;