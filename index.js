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

const adminRouters = require("./src/Routes/admin.route.js");
app.use("/api", adminRouters);

const cartRouters = require("./src/Routes/cart.route.js");
app.use("/api", cartRouters);

const addressRouters = require("./src/Routes/address.route.js");
app.use("/api", addressRouters);

const orderRouter = require("./src/Routes/order.route.js");
app.use("/api", orderRouter);

const paymentRouter = require("./src/Routes/payment.route.js");
app.use("/api", paymentRouter);

const searchRouter = require("./src/Routes/search.route.js");
app.use("/api", searchRouter);

app.listen(PORT, async () => {
  await DB();
  console.log("ecommerce api listing on PORT :", PORT);
});
