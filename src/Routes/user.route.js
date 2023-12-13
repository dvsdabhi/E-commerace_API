const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");

router.get("/profile", userController.getUserProfile);
router.get("/", userController.getAllUser);
router.put("/profile/update", userController.updateProfile);

module.exports = router;
