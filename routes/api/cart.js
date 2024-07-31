const express = require('express');
const { Customer } = require('../../db/models/User');
const { Book } = require('../../db/models/Book');
const { isLoggedIn } = require('../../middleware/auth'); 

const router = express.Router();

// Function to update cart total
async function updateCartTotal(user) {
    try {
        let total = 0;
        for (const item of user.cart.items) {
            const book = await Book.findOne({ isbn: item.book_isbn });
            if (!book) {
                throw new Error(`Book with ISBN ${item.book_isbn} not found.`);
            }
            total += book.price * item.quantity; // Sum total price for each item
        }
        user.cart.total_price = total;
    } catch (error) {
        throw new Error('Failed to calculate cart total: ' + error.message);
    }
}

// Add an item to the cart
router.post('/cart/add', isLoggedIn, async (req, res) => {
    try {
        const { book_isbn, quantity } = req.body;
        const user = req.user;

        const itemIndex = user.cart.items.findIndex(item => item.book_isbn === book_isbn);

        if (itemIndex >= 0) {
            // Item exists, increment quantity
            user.cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            user.cart.items.push({ book_isbn, quantity });
        }

        // Update the cart total
        await updateCartTotal(user);

        await user.save();
        res.status(200).send(user.cart);
    } catch (error) {
        res.status(400).send({ error: 'Failed to add item to cart.' });
    }
});

// Update the quantity of an item in the cart
router.put('/cart/update', isLoggedIn, async (req, res) => {
    try {
        const { book_isbn, quantity } = req.body;
        const user = req.user;

        const item = user.cart.items.find(item => item.book_isbn === book_isbn);

        if (!item) {
            return res.status(404).send({ error: 'Item not found in cart.' });
        }

        if (quantity <= 0) {
            return res.status(400).send({ error: 'Quantity must be greater than zero.' });
        }

        item.quantity = quantity;

        // Update the cart total
        await updateCartTotal(user);

        await user.save();
        res.status(200).send(user.cart);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update item quantity.' });
    }
});

// Delete an item from the cart
router.delete('/cart/delete', isLoggedIn, async (req, res) => {
    try {
        const { book_isbn } = req.body;
        const user = req.user;

        user.cart.items = user.cart.items.filter(item => item.book_isbn !== book_isbn);

        // Update the cart total
        await updateCartTotal(user);

        await user.save();
        res.status(200).send(user.cart);
    } catch (error) {
        res.status(400).send({ error: 'Failed to delete item from cart.' });
    }
});

module.exports = router;
