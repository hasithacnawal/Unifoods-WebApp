const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//Item Model

const Card = require("../../models/Card");

//@rout Get request to api/cards
//@desc Get all Items
//@access public

router.get("/", (req, res) => {
  Card.find()
    .sort({ cardNumber: 1 })
    .then(cards => res.json(cards));
});

//@rout Get request to api/cards
//@desc Get one Items
//@access public
router.get("/:id", (req, res) => {
  Card.findById(req.params.id).then(card => res.json(card));
});

//

//@rout POST api/cards
//@desc Create a POST
//@access private

router.post("/", (req, res) => {
  const { userId, nameOnCard, cardNumber, pin, balance } = req.body;

  //simple validation
  if (!cardNumber || !pin) {
    return res.status(400).json({
      msg: "msg was changed"
    });
  }
  //check for existing user
  Card.findOne({ cardNumber }).then(card => {
    if (card) return res.status(400).json({ msg: "card Already registered" });

    const newCard = new Card({
      userId,
      nameOnCard,
      cardNumber,
      pin,
      balance
    });
    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newCard.pin, salt, (err, hash) => {
        if (err) throw err;
        newCard.pin = hash;
        newCard.save().then(card => {
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
                  userId: card.userId,
                  nameOnCard: card.nameOnCard,
                  cardNumber: card.cardNumber,
                  balance: card.balance
                }
              });
            }
          );
        });
      });
    });
  });
});

// router.post("/", (req, res) => {
//   const { userId, nameOnCard, cardNumber, pin, balance } = req.body;
//   if (!cardNumber || !pin || !nameOnCard || !userId) {
//     return res.status(400).json({
//       msg: "please enter all fields"
//     });
//   }

//   Card.findOne({ cardNumber }).then(card => {
//     if (card) return res.status(400).json({ msg: " Card already registered" });
//   });
//   const newCard = new Card({
//     userId,
//     nameOnCard,
//     cardNumber,
//     pin,
//     balance
//   });

//   newCard.save().then(card => res.json(card));
// });

//@rout Delete api/items:id
//@desc delete an item
//@access private

router.delete("/:id", (req, res) => {
  Card.findById(req.params.id)
    .then(card => card.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
router.route("/update/:id").post((req, res) => {
  Card.findById(req.params.id)
    .then(card => {
      card.userId = req.body.userId;
      card.nameOnCard = req.body.nameOnCard;
      card.cardNumber = req.body.cardNumber;
      card.pin = req.body.pin;
      card.balance = req.body.balance;
      // card.date = Date.parse(req.body.date);

      card
        .save()
        .then(() => res.json("Card updated!"))
        .catch(err => res.status(400).json("Updae Error : " + err));
    })

    .catch(err => res.status(400).json("Error : " + err));
});
module.exports = router;
