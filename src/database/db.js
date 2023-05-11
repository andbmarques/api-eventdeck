const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.dbName}:${process.env.dbPassword}@cluster0.dywuuru.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("\n\x1b[32m[MongoDB] DB Connected\x1b[0m");
    })
    .catch((err) => {
      console.log("\n DB Error:" + err);
    });
};

module.exports = connectDb;
