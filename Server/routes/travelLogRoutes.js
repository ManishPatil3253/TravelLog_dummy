//TRAVEL_LOG/server/routes/travelLogRoutes.js

const express = require("express");
const router = express.Router();
const TravelLog = require("../models/TravelLog");
const authenticateToken = require("../middleware/auth"); // your JWT auth middleware

// **NEW ROUTE: Get all public travel logs**
router.get("/public", async (req, res) => {
  try {
    const publicLogs = await TravelLog.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(publicLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a travel log
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const newLog = new TravelLog({
      user: req.user.id, // set user from token
      title,
      description,
      location,
      date,
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all travel logs of logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const logs = await TravelLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single travel log by id
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const log = await TravelLog.findOne({ _id: req.params.id, user: req.user.id });
    if (!log) return res.status(404).json({ message: "Travel log not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a travel log by id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const log = await TravelLog.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ message: "Travel log not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a travel log by id
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const log = await TravelLog.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!log) return res.status(404).json({ message: "Travel log not found" });
    res.json({ message: "Travel log deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
