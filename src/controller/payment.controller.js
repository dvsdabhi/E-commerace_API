const instance = require("../config/payment");
const crypto = require("crypto");
const Payment = require("../models/payment.model");
const Order = require("../models/order.model");

// const paymentCheckout = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const order = await Order.findById({ _id: id })
//       .populate("user")
//       .populate("shippingAddress");
//     if (!order) {
//       return res
//         .status(400)
//         .send({ status: 400, success: false, message: "Order not found" });
//     }
//     const paymentLinkRequest = {
//       amount: order.totalDiscountedPrice * 100,
//       currency: "INR",
//       customer: {
//         name: order.user.firstName + " " + order.user.lastName,
//         contact: order.shippingAddress.mobile,
//         email: order.user.email,
//       },
//       notify: {
//         sms: true,
//         email: true,
//       },
//       reminder_enable: true,
//       callback_url: `http://localhost:3000/payment/${id}`,
//       callback_method: "get",
//     };

//     const paymentLink = await instance.paymentLink.create(paymentLinkRequest);
//     console.log("paymentLink=-=-=-=-=-=>>>>>", paymentLink);

//     const paymentLinkId = paymentLink.id;
//     const payment_link_url = paymentLink.short_url;

//     const resData = {
//       paymentLinkId,
//       payment_link_url,
//     };

//     return res
//       .status(200)
//       .send({ status: 200, message: true, resData: resData });
//   } catch (error) {
//     return res.status(401).send({ message: error.message, success: false });
//   }

//   //   const { amount } = req.body;
//   //   const options = {
//   //     amount: Number(amount * 100),
//   //     currency: "INR",
//   //   };
//   //   const order = await instance.orders.create(options);
//   //   console.log(order);
//   //   res.status(200).send({ status: 200, success: true, order });
// };

const paymentCheckout = async (req, res) => {
  const { id } = req.params;

  try {
    // Use findById directly without passing an object
    const order = await Order.findById(id)
      .populate("user")
      .populate("shippingAddress");

    // Use strict equality check
    if (!order) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Order not found",
      });
    }

    const paymentLinkRequest = {
      amount: 10 * 100,
      currency: "INR",
      customer: {
        name: `${order.user.firstName} ${order.user.lastName}`,
        contact: order.shippingAddress.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:3000/payment/${id}`,
      callback_method: "get",
    };

    // Use more specific variable names for clarity
    const createdPaymentLink = await instance.paymentLink.create(
      paymentLinkRequest
    );
    console.log("paymentLinkRequest----------------------", paymentLinkRequest);
    // Destructure relevant properties directly
    const { id: paymentLinkId, short_url: paymentLinkUrl } = createdPaymentLink;

    const resData = {
      paymentLinkId,
      paymentLinkUrl, // Updated variable name for consistency
    };

    // Use more descriptive HTTP status codes
    return res.status(200).send({
      status: 200,
      success: true,
      message: "Payment link created successfully",
      resData: resData,
    });
  } catch (error) {
    // Use a more specific HTTP status code for server errors
    return res.status(500).send({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + " | " + razorpay_payment_id;
  const expectedsignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY)
    .update(body.toString())
    .digest("hex");
  const isAuth = expectedsignature === razorpay_signature;
  if (isAuth) {
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    payment.save();
    res.redirect(
      `http://localhost:8080/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).send({ status: 400, success: false });
  }
};

// send secrect key to frontend logic

const send_key = async (req, res) => {
  const secrect_key = process.env.RAZORPAY_KEY;
  //   console.log(secrect_key);
  try {
    return res
      .status(200)
      .send({ status: 200, success: true, secrect_key: secrect_key });
  } catch (error) {
    return res.status(400).send({ status: 400, message: error.message });
  }
};

const updatePaymentInformation = async (req, res) => {
  //   const paymentId = "";
  //   const { id } = req.params;
  const data = req.query;
  console.log("data------------->>>>>>>>>>>>", data);
  try {
    const order = await Order.findById({ _id: data.id })
      .populate("user")
      .populate("shippingAddress");

    const payment_details = await instance.fetch(data.paymentId);
    if (payment_details.status !== "captured") {
      return res
        .status(400)
        .send({ status: 400, message: "payment already done" });
    }
    order.paymentDetails.paymentId = data.paymentId;
    order.paymentDetails.paymentStatus = "COMPLETED";
    await order.save();
    return res
      .status(200)
      .send({ status: 200, message: "order payment success", success: true });
  } catch (error) {
    return res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = {
  paymentCheckout,
  paymentVerification,
  send_key,
  updatePaymentInformation,
};
