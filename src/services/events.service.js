import Events from "../models/Events.js";

const createService = (body) => Events.create(body);
const findAllService = async (offset, limit) =>
  await Events.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("producer");
const countEvents = () => Events.countDocuments();
const topEventsService = () =>
  Events.findOne().sort({ _id: -1 }).populate("producer");

export { createService, findAllService, countEvents, topEventsService };
