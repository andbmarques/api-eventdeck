const express = require("express");
const app = express();
const connectDb = require("./database/db");

const PORT = process.env.PORT || 4000;

const userRoute = require("./routes/user.route");

connectDb();

app.use(express.json());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log("Server running on PORT:" + PORT);
});
