const checkLenght = require("../utils/checkLenght");
const userService = require("../services/user.service");
const { default: mongoose } = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, role, docId, password } = req.body;

  if (!name || !username || !email || !role || !docId || !password) {
    res
      .status(400)
      .json({ msg: "Bad request: Submit all fields for registration" });
  }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(400).json({ msg: "Bad request: Error creating user" });
  }

  res.status(200).json({
    msg: "OK | User created succesfuly",
    user: {
      id: user._id,
      name,
      username,
      email,
      role,
    },
  });
};

const findAllUsers = async (req, res) => {
  const users = await userService.findAll();

  if (checkLenght(users) === 0) {
    return res
      .status(404)
      .json({ msg: "Not found: There are no registered users yet." });
  }

  res.status(200).json(users);
};

const findById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ msg: "Bad request: The inserted ID is not valid." });

  const user = await userService.findById(id);

  if (!user) res.status(404).json({ msg: "Not found: User not found." });

  res.status(200).json(user);
};

module.exports = {
  create,
  findAllUsers,
  findById,
};
