const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // JWT & role check middleware
const AcademicRecord = require("../models/AcademicRecord");

// Test route to check backend & DB
router.get("/test", (req, res) => {
  res.json({ msg: "✅ Backend & DB working!" });
});

// Get own academic records
router.get("/records", auth(["student"]), async (req, res) => {
  try {
    const records = await AcademicRecord.find({ studentId: req.user._id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
