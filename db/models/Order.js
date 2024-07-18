const mongoose = require('mongoose');
const { Schema } = mongoose;

const { itemSchema } = require('./Utility');

const orderSchema = new Schema({
  order_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  }, // custom id (auto-generated or manually input)
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }, // foreign key
  order_datetime: { type: Date, default: Date.now },
  confirm_no: { type: String, required: true },
  promo_code: { type: String, ref: 'Promotion' }, // foreign key promo code
  total_price: { type: Number, required: true },
  order_status: {
    type: String,
    enum: ['confirmed', 'shipped', 'delivered'],
    default: 'confirmed'
  },
  pay_type: {
    type: String,
    required: true,
    enum: ['credit_card', 'cash_on_delivery']
  },
  items: { type: [itemSchema], required: true },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
