const { getUserIdFromToken } = require("../middleware/jwtProvider.js");
const Address = require("../models/address.model.js");
const CartItem = require("../models/cartItem.model.js");

const DeleveryAddress = async (req, res) => {
  const { firstName, lastName, streetAddress, city, state, zipCode, mobile } =
    req.body;
  const jwt_token = req.headers.authorization?.split(" ")[1];

  const userID = getUserIdFromToken(jwt_token);
  try {
    const address = new Address({
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      mobile,
      user: userID,
    });
    address.save();
    return res
      .status(200)
      .send({ message: "address successfully", address: address });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

// get user cart product
const userCartProduct = async (req, res) => {
  const jwt_token = req.headers.authorization?.split(" ")[1];

  const userID = getUserIdFromToken(jwt_token);
  // console.log("userID", userID);
  try {
    const cartProduct = await CartItem.find({ userId: userID }).populate(
      "product"
    );
    const userAddress = await Address.findOne({ user: userID });
    // console.log("cartProduct", cartProduct);
    // console.log("userAddress", userAddress);

    const checkoutProduct = [...cartProduct, { address: userAddress.address }];

    console.log("checkoutProduct", checkoutProduct);
    return res
      .status(200)
      .send({ status: 200, message: "Scuccess", cartProduct: checkoutProduct });
  } catch (error) {
    return res.status(401).send({ status: 401, message: error.message });
  }
};

// get user Address
const userAddress = async (req, res) => {
  const jwt_token = req.headers.authorization?.split(" ")[1];
  // console.log("jwt_token", jwt_token);

  const userID = getUserIdFromToken(jwt_token);
  // console.log("userID", userID);
  try {
    const userAdd = await Address.find({ user: userID });
    // console.log("userAdd", userAdd);
    return res.status(200).send({
      status: 200,
      message: "Address get successfully",
      Address: userAdd,
    });
  } catch (error) {
    return res.status(401).send({ status: 401, error: error.message });
  }
};

// select address
const selectAddress = async (req, res) => {
  const { _id } = req.body;
  const jwt_token = req.headers.authorization?.split(" ")[1];
  // console.log("jwt_token=======",jwt_token);
  // console.log("_id=======",_id);

  const userID = getUserIdFromToken(jwt_token);
  try {
    const userAdd = await Address.find({ user: userID });

    // Update the selected address
    const selectAdd = await Address.findOneAndUpdate(
      { _id },
      { $set: { select: true } },
      { new: true } // Return the updated document
    );

    // Set select to false for other addresses
    for (const address of userAdd) {
      if (address._id.toString() !== _id) {
        address.select = false;
        await address.save();
      }
    }
    return res.status(200).send({
      status: 200,
      message: "address selected successfully",
      selectAdd: selectAdd,
    });
  } catch (error) {
    return res.status(401).send({ status: 401, error: error.message });
  }
};

// handle ordersummary page address
const getOrderSummaryAdd = async (req, res) => {
  const jwt_token = req.headers.authorization?.split(" ")[1];
  const userID = getUserIdFromToken(jwt_token);
  try {
    const add = await Address.find({ user: userID });
    if (!add) {
      return res
        .status(401)
        .send({ status: 401, message: "not found address" });
    }
    // let selectedAdd;

    const filterAdd = add.filter((address) => address.select === true);
    return res
      .status(200)
      .send({ status: 200, message: "success", address: filterAdd });
    // for (const address of add) {
    //   const filterAdd = address.filter((address) => address.select === true);
    //   console.log(filterAdd);
    // }
  } catch (error) {
    return res.status(201).send({ status: 201, message: error.message });
  }
};

module.exports = {
  DeleveryAddress,
  userCartProduct,
  userAddress,
  selectAddress,
  getOrderSummaryAdd,
};
