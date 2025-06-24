const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /user/register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;

    const existing = await User.findOne({
      where: { email },
    });
    if (existing)
      return res.status(400).json({ error: "Email đã được đăng ký" });

    const user = await User.create({ email, password, name });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email không đúng" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Mật khẩu không đúng" });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
