require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const AuthAdmintoken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      console.log("token", token);
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.userId;
      console.log("decodedToken", decodedToken);
      const existUser = await userModel.findOne({ _id: userId });

      if (existUser) {
        const userEmail = existUser.email;

        if (userEmail === "divyeshd623@gmail.com") {
          // Update the user role to "admin" in the database
          await userModel.updateOne({ _id: userId }, { role: "admin" });
          decodedToken.role = "admin";
        }
        req.user = decodedToken;
        console.log("decodedToken", decodedToken);
        next();
      } else {
        return res.status(401).send({ msg: "User not exist.." });
      }
    }
  } catch (error) {
    console.log("error in admin middleware token", error);
    return res.status(501).send({ msg: error.message });
  }
};

module.exports = AuthAdmintoken;

// const authenticateJWT = async (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const decodedToken = jwt.verify(token, config.secretKey);
//     // Fetch user from the database using the decoded token's user ID
//     const user = await User.findById(decodedToken.id);
//     if (!user) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     // Optionally, assign admin role based on email address

//     if (user.username === "divesh@gmail.com") {
//       decodedToken.role = "admin";
//     }
//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(403).json({ message: "Forbidden" });
//   }
// };
