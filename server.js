const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const search = require('./routes/api/search');
const users = require('./routes/api/user');
const customers = require('./routes/api/customer');
const admins = require('./routes/api/admin');
const books = require('./routes/api/book');
const orders = require('./routes/api/order');
const promotions = require('./routes/api/promotion');
const vendors = require('./routes/api/vendor');
const employees = require('./routes/api/employee');
const Book = require('./db/models/Book');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/src')));
app.use(express.json());


const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB)
    .then( () => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error:', err));

// API routes
app.use('/api/search', search)
app.use('/api/user', users);
app.use('/api/customer', customers);
app.use('/api/admin', admins);
app.use('/api/book', books);
app.use('/api/order', orders);
app.use('/api/promotion', promotions);
app.use('/api/vendor', vendors);
app.use('/api/employee', employees);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.js'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));