const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('../models/Book');
const { Customer, Admin } = require('../models/User');
const Order = require('../models/Order');
const Promotion = require('../models/Promotion');

const books = require('../dummy_data/dummyBooks');
const admins = require('../dummy_data/dummyAdmins');
const customers = require('../dummy_data/dummyCustomers');
const orders = require('../dummy_data/dummyOrders');
const promotions = require('../dummy_data/dummyPromotions');

const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB)
  .then(async () => {
    console.log('MongoDB connected...');
    await clearDatabase();
    await insertSamplePromotions();
    await insertSampleBooks(); 
    await insertSampleUsers(); // dummy carts depend on book isbn
    await insertSampleOrders(); // depends on customer ids and book isbn
    mongoose.connection.close();
  })
  .catch(err => console.log('Connection error:', err));

  async function clearDatabase() {
    try {
      await Book.deleteMany({});
      await Customer.deleteMany({});
      await Admin.deleteMany({});
      await Order.deleteMany({});
      await Promotion.deleteMany({});
      console.log('Database cleared successfully');
    } catch (error) {
      console.error('Error clearing database:', error);
    }
  }
  
  async function insertSampleBooks() {
  try {
    const result = await Book.insertMany(books);
    console.log(`${result.length} sample books inserted successfully`);
  } catch (error) {
    console.error('Error inserting sample books:', error);
  }
}

const insertSampleUsers = async () => {
  try {
    const result1 = await Admin.create(admins);
    const result2 = await Customer.create(customers);
    console.log(`${result1.length} sample admins inserted successfully`);
    console.log(`${result2.length} sample customers inserted successfully`);
  } catch (err) {
    console.error('Error inserting sample users:', err);
  }
}

const insertSampleOrders = async () => {
  try {
    const result = await Order.insertMany(orders);
    console.log(`${result.length} sample orders inserted successfully`);
  } catch (error) {
    console.error('Error inserting sample orders:', error);
  }
}

const insertSamplePromotions = async () => {
  try {
    const result = await Promotion.insertMany(promotions);
    console.log(`${result.length} sample promotions inserted successfully`);
  } catch (error) {
    console.error('Error inserting sample promotions:', error);
  }
};