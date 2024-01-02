const { getUserIdFromToken } = require("../middleware/jwtProvider");
const Order = require("../models/order.model");
const shippingAddress = require("../models/address.model");

// create order logic.
const create_Order = async (req, res) => {
  const data = req.body;
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const select_address = await shippingAddress.find({ user: userID });
    // console.log("select_address", select_address);
    for (const address of select_address) {
      if (address.select === true) {
        const order_data = new Order({
          totalPrice: data.totalPrice,
          totalDiscountedPrice: data.totalDiscountedPrice,
          discount: data.discount,
          totalItem: data.totalItem,
          user: userID,
          shippingAddress: address._id,
          buyProduct: data.buyProduct,
        });
        order_data.save();
        return res
          .status(200)
          .send({ status: 200, message: "success", order: order_data });
      }
    }

    return res.status(200).send({ status: 201, message: "faild" });
  } catch (error) {
    return res.status(201).send({ status: 201, message: error.message });
  }
};

// Get user allorder logic
const get_Order = async (req, res) => {
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const order = await Order.find({ user: userID }).populate(
      "shippingAddress"
    );
    // console.log(order);
    return res
      .status(200)
      .send({ status: 200, message: "success", order: order });
  } catch (error) {
    return res.status(201).send({ status: 201, message: error.message });
  }
};

// Get Order details

const order_details = async (req, res) => {
  const { id1,id2 } = req.params;
  // console.log("id=]", id1,id2 ); 
  try {
    const order = await Order.findById({ _id: id1 }).populate("shippingAddress");
    // console.log(order);
    if (!order) {
      return res.status(404).send({ error: "enter a valid order id" });
    }
    return res.status(200).send({
      status: 200,
      message: "order get successfully",
      order: order,
    });
  } catch (error) {
    return res.status(201).send({ status: 201, message: error.message });
  }
};

module.exports = { create_Order, get_Order, order_details };
