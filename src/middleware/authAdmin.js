require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const AuthAdmintoken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      console.log("tpken", token);
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.userId;
      const existUser = await userModel.findOne({ _id: userId });

      if (existUser) {
        console.log(existUser);
        const userEmail = existUser.email;

        if (userEmail === "divyeshd623@gmail.com") {
          // Update the user role to "admin" in the database
          await userModel.findByIdAndUpdate({ _id: userId }, { role: "admin" });
          // Call next() once here
          next();
        } else {
          // If not an admin, you can handle it as needed

          await userModel.findByIdAndUpdate({ _id: userId }, { role: "CUSTOMER" });
          next();
          // return res.status(403).send({ msg: "Not authorized as an admin" });
        }
      } else {
        return res.status(401).send({ msg: "User not exist.." });
      }
    }
  } catch (error) {
    console.log("error in admin middleware token", error);
    return res.status(501).send({ msg: error });
  }
};

module.exports = AuthAdmintoken;
