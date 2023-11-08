require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to e-commerce api - node", status: true });
});

const authRouters = require("./src/Routes/auth.route.js");
app.use("/api/auth", authRouters);

const userRouters = require("./src/Routes/user.route.js");
app.use("/api/users", userRouters);

app.listen(PORT, async () => {
  await DB();
  console.log("ecommerce api listing on PORT :", PORT);
});
