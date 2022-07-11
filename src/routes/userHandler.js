const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign Up
router.post("/signup", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: password,
    });
    const user = await newUser.save();
    if (user) {
      res.status(200).json({ message: "User Signed up successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "A server Error Occured." });
  }
});

// Log In
router.post("/singin", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    const isVerified = await bcrypt.compare(req.body.password, user[0].password);
    
    if (isVerified) {
      const token = await jwt.sign(user[0].username, process.env.JWT_SECRET);
      res.status(200).json({ token, message: "User Signed in Successfully" });
    } else {
      res.status(401).json({ error: "Authentication Error!" });
    }
  } catch (error) {
    res.status(500).json({ error: "A server Error Occured Here." });
  }
});

module.exports = router;
