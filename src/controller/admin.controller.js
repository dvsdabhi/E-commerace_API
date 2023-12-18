const Product = require("../models/product.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

// Add product api
const addProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    discountPersent,
    brand,
    color,
    quantity,
    sizes,
    imageUrl,
    category,
    childCategory,
    subChildCategory,
  } = req.body;
  try {
    const product = await Product.findOne({ title });
    // console.log("product==", product);
    if (product) {
      return res.status(404).send({ error: "product already exists" });
    }
    const discount_price = (price * discountPersent) / 100;
    const sell_price = (price - discount_price).toFixed(0);
    const newProduct = new Product({
      title,
      description,
      price,
      discountPersent,
      discountedPrice: sell_price,
      imageUrl,
      brand,
      color,
      quantity,
      category,
      childCategory,
      subChildCategory,
      sizes,
    });
    newProduct.save();
    return res.status(200).send({ message: "Product added" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// get all product api
const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(400).send({ error: "No product found!!" });
    }
    return res.status(200).send({
      status: 200,
      message: "Product getted successfully!",
      product: product,
    });
  } catch (error) {}
};

//  get single product api
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await Product.findById({ _id: id });
    if (!singleProduct) {
      return res.status(404).send({ error: "enter a valid product id" });
    }
    return res.status(200).send({
      status: 200,
      message: "product get successfully",
      singleProduct: singleProduct,
    });
  } catch (error) {
    return res.status(404).send({ error: "Not found this product" });
  }
};

//delete product logic.
const deleteProduct = async (req, res) => {
  const { product_Id } = req.params;
  try {
    const product = await Product.find({ _id: product_Id });
    if (product) {
      const item = await Product.findByIdAndDelete({ _id: product_Id });
      return res.status(200).send({ message: "product deleted successfully" });
    }
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
};

// view order logic

const viewOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).send({ message: "no order found" });
    }
    return res
      .status(200)
      .send({ message: "order get successfully", orders: orders });
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
};
// delete order logic
const deleteOrder = async (req, res) => {
  const { order_Id } = req.params;
  try {
    const order = await Order.find({ _id: order_Id });
    if (order) {
      const item = await Order.findByIdAndDelete({ _id: order_Id });
      return res.status(200).send({ message: "order deleted successfully" });
    }
  } catch (error) {
    return res.status(200).send({ message: error.message });
  }
};

// Change order status logic.
const changeOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;
  const { order_Id } = req.params;
  // console.log(orderStatus, order_Id);
  try {
    // const order = await Order.findById({ _id: order_id });
    // if (!order) {
    //   return res.status(401).send({ message: "no order found" });
    // }

    const update_status = await Order.findByIdAndUpdate(
      { _id: order_Id },
      { $set: { orderStatus: orderStatus } },
      { new: true }
    );
    if (!update_status) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).send({
      message: "order status updated",
      status: update_status,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// get all user logic.

const allUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).send({
      message: "success",
      user: user,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  viewOrder,
  deleteOrder,
  changeOrderStatus,
  allUser,
};
