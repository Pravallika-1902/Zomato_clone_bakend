const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.food");
  res.json(orders);
});

// Place an order
router.post("/", async (req, res) => {
  const { user, items, totalAmount } = req.body;
  const order = new Order({ user, items, totalAmount });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;