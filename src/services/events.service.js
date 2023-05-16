import Events from "../models/Events.js";

const createService = (body) => Events.create(body);

const findAllService = async (offset, limit) =>
  await Events.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate({ path: "producer", select: "-docId" });

const countEvents = () => Events.countDocuments();

const topEventsService = () =>
  Events.findOne()
    .sort({ _id: -1 })
    .populate({ path: "producer", select: "-docId" });

const findByIdService = (id) =>
  Events.findById(id).populate({ path: "producer", select: "-docId" });

const searchByTitleService = (title) =>
  Events.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate({ path: "producer", select: "-docId" });

export {
  createService,
  findAllService,
  countEvents,
  topEventsService,
  findByIdService,
  searchByTitleService,
};
