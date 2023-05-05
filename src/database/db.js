const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      `mongodb+srv://andbmarques:252244Aa@cluster0.dywuuru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("\nDB Connected");
    })
    .catch((err) => {
      console.log("\n DB Error" + err);
    });
};

module.exports = connectDb;
