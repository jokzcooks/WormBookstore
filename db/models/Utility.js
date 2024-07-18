const mongoose = require('mongoose');
const { Schema } = mongoose;

// embedded schemas
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

const payCardSchema = new Schema({
  type: { type: String, required: true },
  number: { type: String, required: true },
  expiry_date: { type: Date, required: true }
});

const itemSchema = new Schema({
  book_isbn: { type: String, ref: 'Book', required: true }, // foreign key ISBN
  quantity: { type: Number, required: true, integer: true }
});

const cartSchema = new Schema({
  items: { type: [itemSchema], required: true },
  total_price: { type: Number, default: 0 }
});

module.exports = { addressSchema, payCardSchema, cartSchema, itemSchema };