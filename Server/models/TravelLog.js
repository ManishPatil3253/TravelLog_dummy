//TRAVEL_LOG/server/models/TravelLog.js

const mongoose = require("mongoose");

const travelLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  location: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("TravelLog", travelLogSchema);
