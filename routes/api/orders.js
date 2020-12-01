const express = require("express");
const router = express.Router();

//import Order Model
const Order = require("../../models/Order");

//@rout Get request to api/orders
//@desc Get all Items
//@access public

router.get("/", (req, res) => {
  Order.find()
    .sort({ date: -1 })
    .then(orders => res.json(orders));
});

//get by id
router.get("/:id", (req, res) => {
  Order.findById(req.params.id).then(order => res.json(order));
  // Item.findOne({token: req.body.token}).then
});

//@rout POST api/orders
//@desc Create a POST
//@access public

router.post("/", (req, res) => {
  const newOrder = new Order({
    // orderNumber: req.body.orderNumber,
    amount: req.body.amount,
    items: req.body.items,
    type: req.body.type,
    userId: req.body.userId,
    userRegNo: req.body.userRegNo,
    cardNumber: req.body.cardNumber
  });

  newOrder.save().then(order => res.json(order));
});

// @rout Updaye api/order:id
// @desc delete an item
// @access private
router.route("/update/:id").put((req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      order.done = req.body.done;
      // item.date = Date.parse(req.body.date);

      order
        .save()
        .then(() => res.json("Order updated!"))
        .catch(err => res.status(400).json("Update Error : " + err));
    })

    .catch(err => res.status(400).json("Error : " + err));
});

router.delete("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then(order => order.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
