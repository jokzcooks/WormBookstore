const express = require('express');
const { Customer } = require('./path_to_your_user_models'); // Adjust path accordingly
const { itemSchema } = require('./path_to_your_utility_models'); // Adjust path accordingly

const router = express.Router();

// Middleware to check authentication
function authMiddleware(req, res, next) {
  // Assume user is added to req by previous middleware
  if (!req.user) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
  next();
}

// Add an item to the cart
router.post('/cart/add', authMiddleware, async (req, res) => {
  try {
    const { book_isbn, quantity } = req.body;
    const user = await Customer.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const itemIndex = user.cart.items.findIndex(item => item.book_isbn === book_isbn);

    if (itemIndex >= 0) {
      // Item exists, increment quantity
      user.cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.items.push({ book_isbn, quantity });
    }

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add item to cart.' });
  }
});

// Update the quantity of an item in the cart
router.put('/cart/update', authMiddleware, async (req, res) => {
  try {
    const { book_isbn, quantity } = req.body;
    const user = await Customer.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const item = user.cart.items.find(item => item.book_isbn === book_isbn);

    if (!item) {
      return res.status(404).send({ error: 'Item not found in cart.' });
    }

    if (quantity <= 0) {
      return res.status(400).send({ error: 'Quantity must be greater than zero.' });
    }

    item.quantity = quantity;

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update item quantity.' });
  }
});

// Delete an item from the cart
router.delete('/cart/delete', authMiddleware, async (req, res) => {
  try {
    const { book_isbn } = req.body;
    const user = await Customer.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    user.cart.items = user.cart.items.filter(item => item.book_isbn !== book_isbn);

    await user.save();
    res.status(200).send(user.cart);
  } catch (error) {
    res.status(400).send({ error: 'Failed to delete item from cart.' });
  }
});

module.exports = router;
