const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const secretkey = "phyvauac.lk@2024";
const Log = require("../models/Log");

router.post("/register", async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    console.log("BODY", req.body, email);
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required fileds",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });
    }
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const result = await User.create({ username, email, password, role });
    // Log registration
    await Log.create({
      userId: result._id,
      action: "register",
      targetType: "User",
      targetId: result._id,
      ipAddress: req.ip,
      details: `User registered with email ${email}`,
    });
    return res.status(200).json({
      message: "Registartion Success",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide the required fileds",
      });
    }
    const user = await User.findOne({ username }).populate("role");
    console.log("Login user", user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const payload = {
      userId: user._id,
      role: user.role.name,
    };
    const token = jwt.sign(payload, secretkey, { expiresIn: "24h" });
    await Log.create({
      userId: user._id,
      action: "login",
      targetType: "User",
      targetId: user._id,
      ipAddress: req.ip,
      details: `User logged in with username ${username}`,
    });
    return res.status(200).json({
      message: "Login Success",
      success: true,
      token,
      user: { id: user._id, username: user.username, role: user.role.name },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
