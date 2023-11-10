const Product = require("../models/product.model");

// Add product api
const addProduct = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const product = await Product.findOne({ title });
    if (product) {
      return res.status(404).send({ error: "product already exists" });
    }
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
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
    return res
      .status(200)
      .send({ status: 200, message:"product get successfully", singleProduct: singleProduct });
  } catch (error) {
    return res.status(404).send({ error: "Not found this product" });
  }
};

module.exports = { addProduct, getProduct, getSingleProduct };
