require("dotenv").config();
const { getUserIdFromToken } = require("../middleware/jwtProvider.js");
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
    return res.status(200).send({ message: "user get success", user: user });
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

// update profile logic
const updateProfile = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const jwt_token = req.headers.authorization?.split(" ")[1];
    if (!jwt_token) {
      return res.status(404).send({ error: "token not found" });
    }
    const user_ID = getUserIdFromToken(jwt_token);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: user_ID },
      { $set: { firstName: firstName, lastName: lastName } },
      // { firstName, lastName },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      message: "user profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { getUserProfile, getAllUser, updateProfile };
