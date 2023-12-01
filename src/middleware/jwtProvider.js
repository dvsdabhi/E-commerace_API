require("dotenv").config();
const jwt = require("jsonwebtoken");

//generate jwt token using userById
const generateToken = (userId) => {
  // console.log("userId----------", userId);
  const payload = { userId };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "48h" });
  // console.log("token----------", token);
  return token;
};

// get userId from token
const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.log("token error", error);
  }
};

module.exports = { generateToken, getUserIdFromToken };
