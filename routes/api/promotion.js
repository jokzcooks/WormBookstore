const express = require('express');
const router = express.Router();
const Promotion = require('../../db/models/Promotion'); 

// @route   POST api/promotion
// Create a new promotion
router.post('/', async (req, res) => {
  const promotion = new Promotion({
    ...req.body
  });

  try {
    const newPromotion = await promotion.save();
    res.status(201).json(newPromotion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/promotion
// Get all promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/promotion/code/:promo_code
// Get promotion by promo_code
router.get('/code/:promo_code', async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ promo_code: req.params.promo_code });
    if (!promotion) {
      return res.status(404).json({ message: 'Cannot find promotion' });
    }
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/promotion/:id
// Get promotion by ID
router.get('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Cannot find promotion' });
    }
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/promotion/:id
// Update a promotion
router.put('/:id', async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Cannot find promotion' });
    }
    res.json(updatedPromotion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/promotion/:id
// Delete a promotion
router.delete('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Cannot find promotion' });
    }
    res.json({ message: 'Deleted promotion' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
