const User = require("../models/user.model");

const jwtProvider = require("../middleware/jwtProvider.js");

const bcrypt = require("bcrypt");

// new user Signup
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .send({ status: 401, message: "user already exists.." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      password: hashPassword,
      email,
    });

    newUser.save();
    return res
      .status(200)
      .send({ status: 200, message: "user register success.." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// user SignIn
const login = async (req, res) => {
  const { password, email } = req.body;
  // console.log("password--->>>>>>", password);
  // console.log("email--->>>>>>", email);
  try {
    const user = await User.findOne({ email });
    console.log("user--->>>>>>", user);

    if (!user) {
      return res
        .status(404)
        .send({ status: 404, message: "Please create account.. : " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password..." });
    }
    // console.log("JWT---->>>>>>>>>>");
    if (user.email === "divyeshd623@gmail.com") {
      user.role = "admin";
      // Update the user role to "admin" in the database
      await User.updateOne({ _id: user._id }, { role: "admin" });
    }
    const jwt = jwtProvider.generateToken(user._id, user.role);
    console.log("JWT---->>>>>>>>>>", jwt);
    return res.status(200).send({
      status: 200,
      token: jwt,
      role: user.role,
      message: "login success",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
