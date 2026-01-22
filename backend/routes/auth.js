const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");

// Register (optional for hackathon)
router.post("/register", async (req, res) => {
  const { name, email, password, role, department } = req.body;
  try {
    const passwordHash = await hashPassword(password);
    const user = new User({ name, email, passwordHash, role, department });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

    user.lastLogin = new Date();
    await user.save();

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
