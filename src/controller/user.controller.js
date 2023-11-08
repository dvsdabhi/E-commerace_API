require("dotenv").config();
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const getUserProfile = async (req, res) => {
  try {
    const jwt_token = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }
    const user_ID = jwt.verify(jwt_token, process.env.SECRET_KEY);
    const user = await User.findById(user_ID.userId);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.send(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUser };
