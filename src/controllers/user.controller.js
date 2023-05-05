const userService = require("../services/user.service");

const create = async (req, res) => {
  const { name, username, email, role, docId, password } = req.body;

  if (!name || !username || !email || !role || !docId || !password) {
    res
      .status(400)
      .json({ msg: "Bad request: Submit all fields for registration" });
  }

  const user = await userService.create(req.body);

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

module.exports = {
  create,
};
