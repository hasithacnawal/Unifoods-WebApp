const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");

//Item Model

const Item = require("../../models/Item");

//@rout Get request to api/items
//@desc Get all Items
//@access public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});
//get by id
router.get("/:id", (req, res) => {
  Item.findById(req.params.id).then(item => res.json(item));
  // Item.findOne({token: req.body.token}).then
});
//@rout POST api/items
//@desc Create a POST
//@access private

router.post("/", (req, res) => {
  const newItem = new Item({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    qty: req.body.qty,
    info: req.body.info,
    vegi: req.body.vegi,
    inCart: req.body.inCart,
    count: req.body.count,
    total: req.body.total
  });

  newItem.save().then(item => res.json(item));
});
//@rout Delete api/items:id
//@desc delete an item
//@access private
router.route("/update/:id").post((req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.title = req.body.title;
      item.price = req.body.price;
      item.img = req.body.img;
      item.qty = req.body.qty;
      item.info = req.body.info;
      item.vegi = req.body.vegi;
      item.inCart = req.body.inCart;
      item.count = req.body.count;
      item.total = req.body.total;
      // item.date = Date.parse(req.body.date);

      item
        .save()
        .then(() => res.json("Item updated!"))
        .catch(err => res.status(400).json("Update Error : " + err));
    })

    .catch(err => res.status(400).json("Error : " + err));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
