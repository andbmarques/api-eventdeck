import checkLength from "../utils/checkLength.js";
import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();

    if (checkLength(users) === 0) {
      return res
        .status(404)
        .json({ msg: "Not found: There are no registered users yet." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, username, email, role, docId, password } = req.body;

    if (!name && !username && !email && !role && !docId && !password) {
      res
        .status(400)
        .json({ msg: "Bad request: Send at least one field to update." });
    }

    const id = req.id;

    await userService.update(id, name, username, email, role, docId, password);

    res.status(200).json({ msg: "User changed successfully!" });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res
      .status(500)
      .json({ msg: "Server Error: " + error ? error.message : "" });
  }
};

export default { create, findAllUsers, findById, update };
