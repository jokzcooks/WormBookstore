const express = require('express');
const router = express.Router();
const Order = require('../../models/Order'); 

// @route   POST api/order
// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    ...req.body
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/order
// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/order/order_id/:order_id
// Get order by order_id
router.get('/order_id/:order_id', async (req, res) => {
  try {
    const order = await Order.findOne({ order_id: req.params.order_id });
    if (!order) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/order/:id
// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/order/customer/:customer_id
// Get all orders for a specific customer_id
router.get('/customer/:customer_id', async (req, res) => {
  try {
    const orders = await Order.find({ customer_id: req.params.customer_id });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this customer' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/order/isbn/:isbn
// Get all orders for a book_isbn
router.get('/isbn/:isbn', async (req, res) => {e
  try {
    const orders = await Order.find({ 'items.book_isbn': req.params.isbn });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this ISBN' });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/order/:id
// Update an order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/order/:id
// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
    res.json({ message: 'Deleted order' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
