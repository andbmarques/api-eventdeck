require("dotenv").config();
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
  console.log("\n\x1b[34m[server] Server running on PORT: \x1b[0m" + PORT);
});
