const instance = require("../config/payment");
const crypto = require("crypto");
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");


// add payment details logic
const Payment_details = async(req,res) => {
  const { paymentDetails, orderId } = req.body;
  console.log("paymentDetails",paymentDetails);
  console.log("orderId",orderId);
  try {
    const order = await Order.findByIdAndUpdate(
      { _id : orderId},
      { $set : {orderStatus:"Completed",'paymentDetails.paymentStatus':"Success"}},
      { new: true }
    );
    // console.log(order);
     // If the order was not found or the update didn't happen, handle it accordingly
    if (!order) {
      return res.status(404).send({ status: 404, message: "Order not found" });
    }

    // Create a new Payment document
    const pay = new Payment({
      razorpay_order_id : paymentDetails.razorpay_order_id,
      razorpay_payment_id : paymentDetails.razorpay_payment_id,
      razorpay_signature : paymentDetails.razorpay_signature,
      order : orderId,
    });
    await pay.save();
    
    return res.status(200).send({status:200,message:"Success",payment_details:pay});
  } catch (error) {
    return res.status(400).send({status:400,message:error.message});
  }
}

const Payment_success = async(req,res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency: currency || 'INR',
  };
  try {
    const razorpayOrder  = await instance.orders.create(options);
    res.status(200).send({order:razorpayOrder , message: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


// //Verifying the payment
// const Payment_verify = async (req,res) => {
//   try {
//     const {razorpay_orderID,razorpay_paymentID,razorpay_signature } = req.body;
//     const sign = razorpay_orderID + "|" + razorpay_paymentID;
//     const resultSign = crypto
//     .createHmac("sha256",process.env.RAZORPAY_KEY)
//     .update(sign.toString())
//     .digest("hex");

//     if (razorpay_signature == resultSign){
//       return res.status(200).json({message:"Payment verified successfully"});
//     }

//   } catch(error) {
//     console.log(error);
//     res.status(500).json({message:"Internal Server Error!"});
//   }
// }

module.exports = {
  Payment_success,
  Payment_details,
  // Payment_verify,
};
