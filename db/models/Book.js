const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn: { // Unique ISBN for reference
    type: String,
    required: true,
    unique: true
  },
  category: String,
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true},
  rating: Number,
  edition: String,
  publish_year: { type: Number, integer: true },
  publisher: String,
  cover_pic: String,
  qty_in_stock: { type: Number, integer: true, required: true },
  min_threshold: { type: Number, integer: true },
  buy_price: { type: Number, required: true },
  sell_price: { type: Number, required: true }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;