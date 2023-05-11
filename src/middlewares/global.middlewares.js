const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (id.toString().length !== 24)
      res.status(400).json({
        msg: "Bad request: The inserted ID must contain exactly 24 characters.",
      });
    else if (!mongoose.Types.ObjectId.isValid(id))
      res
        .status(400)
        .json({ msg: "Bad request: The inserted ID is not valid." });
    else {
      next();
    }
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userService.findById(id);

    if (!user) res.status(404).json({ msg: "Not found: User not found." });

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

module.exports = { validId, validUser };
