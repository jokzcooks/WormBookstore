const mongoose = require('mongoose');
const { Schema } = mongoose;

const promotionSchema = new Schema({
  promo_code: { // Unique code for reference
    type: String,
    required: true,
    unique: true
  },
  percentage: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true }
});

const Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;
