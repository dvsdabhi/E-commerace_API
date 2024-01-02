const { getUserIdFromToken } = require("../middleware/jwtProvider");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

// add item to the cart
const addTocart = async (req, res) => {
  const { id,size } = req.body;
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const product = await Product.findById({ _id: id });
    if (product) {
      const existProduct = await CartItem.findOne({
        $and: [{ product: product._id }, { userId: userID }],
      });
      if (existProduct) {
        return res
          .status(404)
          .send({ message: "product already added in the cart." });
      }
      const newCartitem = new CartItem({
        product: product._id,
        size: size,
        price: product.price,
        userId: userID,
      });
      newCartitem.save();
      return res.status(200).send({ message: "Product added to cart." });
    }
    return res.status(401).send({ message: "Product not found." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// getCart item....
const getCartItemProduct = async (req, res) => {
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const cartProduct = await CartItem.find({ userId: userID }).populate(
      "product"
    );
    if (cartProduct) {
      return res.status(200).send({
        status: 200,
        message: "cart item get successfully.",
        cartProduct: cartProduct,
      });
    }
    return res.status(400).send({
      status: 400,
      message: "cart is empty.",
    });
  } catch (error) {
    return res.status(401).send({ message: "Cart is empty" });
  }
};

//removeProduct from cart
const getCartDelete = async (req, res) => {
  const { item_Id } = req.params;
  try {
    const item = await CartItem.findById(item_Id);
    if (item) {
      const item = await CartItem.findByIdAndDelete({ _id: item_Id });
      return res.status(200).send({ message: "product remove from cart" });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

// Product increment and decrement logic here.
const GetProductQty = async (req, res) => {
  const { product_Id } = req.params;
  const { action } = req.body;
  try {
    const product = await CartItem.findById(product_Id);
    if (!product) {
      return res.status(404).send({ msg: "Product not exist." });
    }

    if (action === "increment") {
      product.quantity += 1;
    }

    if (action === "decrement") {
      product.quantity -= 1;
    }

    product.save();
    return res.status(201).send({ msg: "Product qty updated." });
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = {
  addTocart,
  getCartItemProduct,
  getCartDelete,
  GetProductQty,
};
