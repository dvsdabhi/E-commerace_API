require("dotenv").config();
const jwt = require("jsonwebtoken");

// Generate JWT token using userId and role
const generateToken = (userId, role) => {
  try {
    const payload = { userId, role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "48h",
    });
    console.log("Token generated successfully:", token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
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
