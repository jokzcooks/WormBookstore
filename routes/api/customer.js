const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Customer } = require('../../db/models/User'); 

// @route   POST api/customer
// Create a new customer
router.post('/', async (req, res) => {
  const customer = new Customer({
    ...req.body
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/customer
// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/customer/:id
// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/customer/:id
// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/customer/:id
// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
    res.json({ message: 'Deleted customer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST api/customer/:id/payment
// Add or update payment information
router.post('/:id/payment', async (req, res) => {
  try {
    const { type, number, expiry_date, card_index } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }

    // Hash the card number
    const hashedNumber = await bcrypt.hash(number, 10);

    if (typeof card_index === 'number' && card_index >= 0 && card_index < customer.payment_cards.length) {
      // Update existing card
      customer.payment_cards[card_index].type = type;
      customer.payment_cards[card_index].expiry_date = expiry_date;
      customer.payment_cards[card_index].number = hashedNumber;
    } else {
      // Add new card
      if (customer.payment_cards.length >= 3) {
        return res.status(400).json({ message: 'Payment card limit reached.' });
      }
      customer.payment_cards.push({ type, number: hashedNumber, expiry_date });
    }

    await customer.save();
    res.status(200).json(customer.payment_cards);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   POST api/customer/:id/address
// Add or update shipping address
router.post('/:id/address', async (req, res) => {
  try {
    const { street, city, state, zip } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }

    // Update address
    customer.address = { street, city, state, zip };

    await customer.save();
    res.status(200).json(customer.address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
