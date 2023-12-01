const Address = require("../models/address.model.js");

const DeleveryAddress = async (req, res) => {
  const { firstName, lastName, streetAddress, city, state, zipCode, mobile } =
    req.body;
  try {
    const address = await Address({
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipCode,
      mobile,
    });
    address.save();
    return res
      .status(200)
      .send({ message: "update address successfully", address: address });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = { DeleveryAddress };
