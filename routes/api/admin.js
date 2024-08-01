const express = require('express');
const router = express.Router();
const { User, Admin, Customer } = require('../../db/models/User'); // Adjust the path according to your file structure
const { isLoggedIn, isAdmin } = require('../../middleware/auth'); // Adjust the path according to your file structure
const Promotion = require('../../db/models/Promotion');
const Book = require('../../db/models/Book');

// @route   POST api/admin
// Create a new admin
router.post('/', isLoggedIn, isAdmin, async (req, res) => {
  const admin = new Admin({
    ...req.body
  });

  try {
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/admin
// Get all admins
router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   GET api/admin
// Get all admins
router.get('/data', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const customers = await Customer.find();
    const books = await Book.find();
    const promotions = await Promotion.find();
    res.json({
      customers,
      books,
      promotions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   GET api/admin/:id
// Get admin by ID
router.get('/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Cannot find admin' });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/admin/:id
// Update an admin
router.put('/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Cannot find admin' });
    }
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/admin/:id
// Delete an admin
router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Cannot find admin' });
    }
    res.json({ message: 'Deleted admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/admin/suspend/:id
// Suspend a user
router.put('/suspend/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    console.log("Suspending user!")
    const updatedUser = await Customer.findByIdAndUpdate(
      req.params.id,
      { status: 'suspended' },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      console.log("Couldn't find user")
      return res.status(404).json({ message: 'Cannot find user' });
    }
    console.log(updatedUser)
    res.json({ message: 'User suspended successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT api/admin/unsuspend/:id
// Unsuspend a user
router.put('/unsuspend/:id', isLoggedIn, isAdmin, async (req, res) => {
  try {
    console.log("Unsuspending user!")
    const updatedUser = await Customer.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    console.log("User unsuspended successfully!")
    res.json({ message: 'User unsuspended successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
