const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Error connecting to the database. : ${err}`);
    });
};
mongoose.set('strictQuery', false);


module.exports = connectDB;
