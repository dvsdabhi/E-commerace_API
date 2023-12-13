require("dotenv").config();
const Razorpay = require("razorpay");

// console.log(process.env.RAZORPAY_ID);
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_KEY,
});


module.exports = instance;