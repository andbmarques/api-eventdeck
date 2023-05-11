const checkLenght = require("../utils/checkLenght");
const userService = require("../services/user.service");

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
  const user = req.user;
  res.status(200).json(user);
};

const update = async (req, res) => {
  const { name, username, email, role, docId, password } = req.body;

  if (!name && !username && !email && !role && !docId && !password) {
    res
      .status(400)
      .json({ msg: "Bad request: Send at least one field to update." });
  }

  const id = req.id;

  await userService.update(id, name, username, email, role, docId, password);

  res.status(200).json({ msg: "User changed successfully!" });
};

module.exports = {
  create,
  findAllUsers,
  findById,
  update,
};
