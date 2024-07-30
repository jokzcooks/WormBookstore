const express = require('express');
const router = express.Router();
const { Customer } = require('../../db/models/User');
const Order = require('../../db/models/Order'); 
const Promotion = require('../../db/models/Promotion');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../../middleware/auth');
const { sendEmail } = require('../../emailService');

// Middleware to encrypt payment card details
async function encryptCardInfo(cardNumber) {
  const saltRounds = 10;
  return bcrypt.hash(cardNumber, saltRounds);
}

// @route   POST api/checkout
// Checkout process
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const {
      promo_code,
      payment_card,
      shipping_address,
      use_saved_payment,
      use_saved_address,
      card_index // Index of the saved payment card to use
    } = req.body;

    const customer = await Customer.findById(req.user._id);

    // Validate cart
    if (!customer || customer.cart.items.length === 0) {
      return res.status(400).json({
        message:
          'Your cart is empty. Please add items to the cart before proceeding to checkout.'
      });
    }

    // Determine which shipping address to use
    let finalShippingAddress;
    if (use_saved_address) {
      // Use the saved shipping address
      if (!customer.address) {
        return res
          .status(400)
          .json({ message: 'No saved shipping address available.' });
      }
      finalShippingAddress = customer.address;
    } else if (shipping_address) {
      // Use the provided new shipping address
      if (
        !shipping_address.street ||
        !shipping_address.city ||
        !shipping_address.state ||
        !shipping_address.zip
      ) {
        return res
          .status(400)
          .json({ message: 'Please provide a valid shipping address.' });
      }
      finalShippingAddress = shipping_address;
    } else {
      return res.status(400).json({ message: 'No shipping address provided.' });
    }

    // Determine which payment card to use
    let finalPaymentCard;
    if (use_saved_payment) {
      // Use the payment card specified by card_index
      if (
        typeof card_index !== 'number' ||
        card_index < 0 ||
        card_index >= customer.payment_cards.length
      ) {
        return res.status(400).json({
          message: 'Invalid card index. Please select a valid saved card.'
        });
      }
      finalPaymentCard = customer.payment_cards[card_index];
    } else if (payment_card) {
      // Use the provided new payment card
      if (
        !payment_card.number ||
        !payment_card.type ||
        !payment_card.expiry_date
      ) {
        return res
          .status(400)
          .json({ message: 'Please provide a valid payment card.' });
      }
      // Encrypt the new card number
      const encryptedCardNumber = await encryptCardInfo(payment_card.number);
      finalPaymentCard = {
        ...payment_card,
        number: encryptedCardNumber
      };
    } else {
      return res.status(400).json({ message: 'No payment card provided.' });
    }

    // Validate promo code (if provided)
    let discount = 0;
    if (promo_code) {
      const promotion = await Promotion.findOne({ promo_code });

      if (!promotion) {
        return res.status(404).json({ message: 'Invalid promotion code.' });
      }

      const now = new Date();
      if (now < promotion.start_date || now > promotion.end_date) {
        return res
          .status(400)
          .json({ message: 'Promotion code is not valid at this time.' });
      }

      discount = (customer.cart.total_price * promotion.percentage) / 100;
    }

    // Calculate total price after discount
    const finalPrice = customer.cart.total_price - discount;

    // Create a new order
    const order = new Order({
      customer_id: customer._id,
      confirm_no: `CONF-${Math.random()
        .toString(36)
        .toUpperCase()}`, // Generate a confirmation number
      promo_code,
      total_price: finalPrice,
      order_status: 'confirmed',
      pay_type: 'credit_card', 
      items: customer.cart.items,
      payment_card: {
        type: finalPaymentCard.type,
        number: finalPaymentCard.number,
        expiry_date: finalPaymentCard.expiry_date
      },
      shipping_address: finalShippingAddress
    });

    // Save the order
    const newOrder = await order.save();

    // Clear user's cart after successful order
    customer.cart.items = [];
    customer.cart.total_price = 0;
    await customer.save();

    // Send order confirmation email
    const emailText = `
      Hello ${customer.first_name} ${customer.last_name},

      Thank you for ordering from Worm!

      Here are your order details:

      Confirmation Number: ${order.confirm_no}
      Order ID: ${order._id}
      Order Date: ${order.order_datetime.toLocaleString()}
      Shipping Address: ${finalShippingAddress.street}, ${finalShippingAddress.city}, ${finalShippingAddress.state} ${finalShippingAddress.zip}
      
      Ordered Items:
      ${order.items.map(item => `- ${item.book_isbn}, Quantity: ${item.quantity}`).join('\n')}

      Total Amount: $${order.total_price.toFixed(2)}

      We appreciate your business!

      Best regards,
      Worm Bookstore
    `;

    sendEmail(customer.email, 'Order Confirmation', emailText);

    res.status(201).json({
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
