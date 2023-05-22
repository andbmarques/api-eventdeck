import mongoose from "mongoose";
import {
  createService,
  findAllService,
  countEvents,
  topEventsService,
  findByIdService,
  searchByTitleService,
  byUserService,
} from "../services/events.service.js";
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
      producer: req.userId,
    });

    res.status(201).json({ msg: "created" });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }

    const events = await findAllService(offset, limit);
    const total = await countEvents();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const previous = offset - limit < 0 ? null : offset - limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (checkLength(events) === 0) {
      return res
        .status(404)
        .json({ msg: "Not found: There are no registered events yet." });
    }

    res
      .status(200)
      .json({ results: events, nextUrl, previousUrl, limit, offset, total });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const topEvents = async (req, res) => {
  try {
    const event = await topEventsService();

    if (!event) {
      return res
        .status(404)
        .json({ msg: "Not found: There are no registered events yet." });
    }

    res.status(200).json({ event });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: "Bad Request | Invalid ID" });

    const event = await findByIdService(id);
    return res.status(200).json({ event });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const events = await searchByTitleService(title);
    if (events.length === 0) {
      return res
        .status(400)
        .json({ msg: "Bad Request | There is no event with this title" });
    }
    return res.status(200).json({ events });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const events = await byUserService(id);
    return res.status(200).json({ events });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};

export { create, findAll, topEvents, findById, searchByTitle, byUser };
