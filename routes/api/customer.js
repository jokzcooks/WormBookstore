const express = require('express');
const router = express.Router();
const { Customer } = require('../../db/models/User'); // Adjust the path according to your file structure

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

module.exports = router;
