const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { addressSchema, payCardSchema, cartSchema } = require('./Utility');

// Validation function to limit array size of payment cards
function arrayLimit(val) {
  return val.length <= 3;
}

// Base User Schema recognizes role as discriminator key
const userSchema = new Schema({
  user_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  }, // custom id (auto-generated or manually input)
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'admin']
  }
}, { discriminatorKey: 'role', collection: 'users' });

// Generate user authentication token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Hash password before saving user
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const customerSchema = new Schema({
  phone: { type: String, required: false },
  address: addressSchema, // Embedded address
  payment_cards: {  // Embedded array of payment cards
    type: [payCardSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  },
  cart: cartSchema, // Embedded cart
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'suspended'],
    default: 'inactive'
  },
  subscribed: { type: Boolean, default: false },
  verif_code: String
});

const adminSchema = new Schema({
  admin: Boolean  // Toggle to promote/demote admin
});

// different schemas for admin and customer in (base) user collection
const User = mongoose.model('user', userSchema);
const Customer = User.discriminator('customer', customerSchema);
const Admin = User.discriminator('admin', adminSchema);

module.exports = { User, Customer, Admin };

