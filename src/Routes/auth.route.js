const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller.js");
const AuthAdmintoken = require("../middleware/authAdmin.js");

router.post("/signup", authController.register);
router.post("/signin",AuthAdmintoken, authController.login);

module.exports = router;
