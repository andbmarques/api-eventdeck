import { createService, findAllService } from "../services/events.service.js";
import checkLength from "../utils/checkLength.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      return res.status(400).json({
        msg: "Bad Request | Send all fields to create a new event.",
      });
    }

    await createService({
      title,
      text,
      banner,
      producer: "645d3ba7ecf3a1a077c896c5",
    });

    res.status(201).json({ msg: "created" });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res
      .status(500)
      .json({ msg: "Server Error: " + error ? error.message : "" });
  }
};

const findAll = async (req, res) => {
  try {
    const events = await findAllService();

    if (checkLength(events) === 0) {
      return res
        .status(404)
        .json({ msg: "Not found: There are no registered events yet." });
    }

    res.status(200).json(events);
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

export { create, findAll };
