const Product = require("../models/product.model");

const discount_range = async (req, res) => {
  const { discount,lavelOne,lavelThree } = req.params;
  // console.log(discount,lavelOne,lavelThree);
  try {
    const filterData = await Product.find();
    if (!filterData) {
      return res.status(400).send({ message: "not data found" });
    }
    const filterPercentage = filterData.filter(
      (item) => item.discountPersent >= discount && item.category === lavelOne && item.subChildCategory === lavelThree
    );
    if (filterPercentage.length <= 0) {
      return res.status(400).send({ message: "not found" });
    }
    return res
      .status(200)
      .send({ message: "success", filterPercentage: filterPercentage });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const price_range = async (req, res) => {
  const { price,lavelOne,lavelThree } = req.params;
  // console.log(price,lavelOne,lavelThree);
  try {
    const filterData = await Product.find();
    if (!filterData) {
      return res.status(400).send({ message: "not data found" });
    }
    const prc = price.split("-");
    // console.log(prc[0]);
    // console.log(prc[1]);
    const filterPriceRange = filterData.filter(
      (item) =>
        item.discountedPrice >= parseInt(prc[0]) &&
        item.discountedPrice < parseInt(prc[1]) && item.category === lavelOne && item.subChildCategory === lavelThree
    );
    if (filterPriceRange.length <= 0) {
      return res.status(400).send({ message: "not found" });
    }
    return res
      .status(200)
      .send({ message: "success", filterPriceRange: filterPriceRange });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { discount_range, price_range };
