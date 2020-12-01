const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const adminAuth = require("../../middleware/adminAuth");

// User Model
const Admin = require("../../models/Admin");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  Admin.findOne({ email }).then(admin => {
    if (!admin) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: admin.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, adminToken) => {
          if (err) throw err;
          res.json({
            adminToken,
            admin: {
              id: admin.id,
              name: admin.name,
              email: admin.email
            }
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/admin", adminAuth, (req, res) => {
  Admin.findById(req.admin.id)
    .select("-password")
    .then(admin => res.json(admin));
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private

module.exports = router;
