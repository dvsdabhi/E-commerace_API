const { getUserIdFromToken } = require("../middleware/jwtProvider");
const Order = require("../models/order.model");
const shippingAddress = require("../models/address.model");

// create order logic.
const create_Order = async (req, res) => {
  const data = req.body;
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const select_address = await shippingAddress.find({ user: userID,select:true });
    if (select_address.length > 0) {  
      const order_data = new Order({
          totalPrice: data.totalPrice,
          totalDiscountedPrice: data.totalDiscountedPrice,
          discount: data.discount,
          totalItem: data.totalItem,
          user: userID,
          shippingAddress: select_address[0]._id,
          buyProduct: data.buyProduct,
        });
        order_data.save();
        return res
          .status(200)
          .send({ status: 200, message: "success", order: order_data });
    } else {
      return res.status(200).send({ status: 201, message: "No selected address found" });
    }
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
  try {
    const order = await Order.findById({ _id: id1 }).populate("shippingAddress");
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
