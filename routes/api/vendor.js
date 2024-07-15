const express = require('express');
const router = express.Router();
const Vendor = require('../../models/Vendor'); 

// @route   POST api/vendor
// Create a new vendor
router.post('/', async (req, res) => {
  const vendor = new Vendor({
    ...req.body
  });

  try {
    const newVendor = await vendor.save();
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/vendor
// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/vendor/vendor_id/:vendor_id
// Get vendor by vendor_id
router.get('/vendor_id/:vendor_id', async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ vendor_id: req.params.vendor_id });
    if (!vendor) {
      return res.status(404).json({ message: 'Cannot find vendor' });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/vendor/:id
// Get vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Cannot find vendor' });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/vendor/:id
// Update a vendor
router.put('/:id', async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Cannot find vendor' });
    }
    res.json(updatedVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/vendor/:id
// Delete a vendor
router.delete('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Cannot find vendor' });
    }
    res.json({ message: 'Deleted vendor' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
