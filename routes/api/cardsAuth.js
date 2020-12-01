const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const cardAuth = require("../../middleware/cardAuth");

// User Model
const Card = require("../../models/Card");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { cardNumber, pin } = req.body;

  // Simple validation
  if (!cardNumber || !pin) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  Card.findOne({ cardNumber }).then(card => {
    if (!card) return res.status(400).json({ msg: "Card Does not exist" });

    // Validate password
    bcrypt.compare(pin, card.pin).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: card.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, cardToken) => {
          if (err) throw err;
          res.json({
            cardToken,
            card: {
              id: card.id,
              cardNumber: card.cardNumber,
              userId: card.userId,
              nameOnCard: card.nameOnCard,
              pin: card.pin,
              balance: card.balance
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
router.get("/card", cardAuth, (req, res) => {
  Card.findById(req.card.id)
    .select("-pin")
    .then(card => res.json(card));
});

module.exports = router;
