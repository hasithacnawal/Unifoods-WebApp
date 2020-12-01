const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//user Model

const User = require("../../models/User");

//@rout Get post to api/users
//@desc Register new User
//@access public
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

router.post("/", (req, res) => {
  const {
    firstName,
    lastName,
    regNo,
    email,
    password,
    phoneNumber,
    faculty,
    cardNumber,
    pin,
    address
  } = req.body;

  //simple validation
  if (!firstName || !lastName || !email || !regNo || !password) {
    return res.status(400).json({
      msg: "please enter all fields"
    });
  }
  //check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "user is already in there" });

    const newUser = new User({
      firstName,
      lastName,
      regNo,
      email,
      password,
      phoneNumber,
      faculty,
      cardNumber,
      pin,
      address
    });
    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  regNo: user.regNo,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  faculty: user.faculty,
                  cardNumber: user.cardNumber,
                  pin: user.pin,
                  address: user.address
                }
              });
            }
          );
        });
      });
    });
  });
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.regNo = req.body.regNo;
      user.email = req.body.email;
      user.phoneNumber = req.body.phoneNumber;
      user.faculty = req.body.faculty;
      user.address = req.body.address;
      user.cardNumber = req.body.cardNumber;
      user.pin = req.body.pin;
      // item.date = Date.parse(req.body.date);

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Update Error : " + err));
    })

    .catch(err => res.status(400).json("Error : " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted.."))
    .catch(err => res.status(400).json("Error : " + err));
});
module.exports = router;
