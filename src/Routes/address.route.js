const express = require("express");
const router = express.Router();

const addressController = require("../controller/address.controller");

router.post("/address", addressController.DeleveryAddress);

module.exports = router;
