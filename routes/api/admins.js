const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//user Model

const Admin = require("../../models/Admin");

//@rout Get post to api/users
//@desc Register new User
//@access public
router.get("/", (req, res) => {
  Admin.find()
    .sort({ date: -1 })
    .then(admins => res.json(admins));
});

router.post("/", (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  //simple validation
  if (!name || !email || !password || !phoneNumber || !address) {
    return res.status(400).json({
      msg: "please enter all fields"
    });
  }
  //check for existing user
  Admin.findOne({ email }).then(admin => {
    if (admin) return res.status(400).json({ msg: "admin already exists" });

    const newAdmin = new Admin({
      name,
      email,
      password,
      phoneNumber,
      address
    });
    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if (err) throw err;
        newAdmin.password = hash;
        newAdmin.save().then(admin => {
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
                  email: admin.email,
                  phoneNumber: admin.phoneNumber,
                  address: admin.address
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
