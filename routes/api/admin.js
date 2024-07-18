const express = require('express');
const router = express.Router();
const { Admin } = require('../../db/models/User'); // Adjust the path according to your file structure

// @route   POST api/admin
// Create a new admin
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/admin/:id
// Get admin by ID
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;
