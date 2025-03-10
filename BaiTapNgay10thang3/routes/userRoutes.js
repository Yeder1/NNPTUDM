const express = require("express");
const { User, Role } = require("../models/User");

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Users (Filter by username, fullName, loginCount)
router.get("/", async (req, res) => {
  try {
    const { username, fullName, minLogin, maxLogin } = req.query;
    let query = {};

    if (username) query.username = { $regex: username, $options: "i" };
    if (fullName) query.fullName = { $regex: fullName, $options: "i" };
    if (minLogin || maxLogin) query.loginCount = {};
    if (minLogin) query.loginCount.$gte = parseInt(minLogin);
    if (maxLogin) query.loginCount.$lte = parseInt(maxLogin);

    const users = await User.find(query).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get User by Username
router.get("/username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Soft Delete User (Set status = false)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User soft deleted", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Activate User (Set status = true)
router.post("/activate", async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = true;
    await user.save();
    
    res.json({ message: "User activated successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
