import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  confirmed: {
    type: Array,
    required: true,
  },
});

const Events = mongoose.model("Events", EventsSchema);

export default Events;
