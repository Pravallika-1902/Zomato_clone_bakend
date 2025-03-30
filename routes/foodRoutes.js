const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// Get all food items
router.get("/", async (req, res) => {
  const foods = await Food.find().populate("restaurant");
  res.json(foods);
});

// Add a food item
router.post("/", async (req, res) => {
  const food = new Food(req.body);
  try {
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;