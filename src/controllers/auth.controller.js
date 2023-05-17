import bcrypt from "bcrypt";
import {
  generateToken,
  login as loginService,
} from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Not found | Email or password not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(404)
        .json({ msg: "Not found | Email or password not found" });
    }

    const token = generateToken(user.id);
    const userId = user._id;

    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { login };
