const express = require('express');
const mongoose = require('mongoose');
const Book = require('../WormBookstore-main/models/Book.js');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://team5:Team5@cluster0.qom8ksk.mongodb.net/Online_Bookstore?retryWrites=true&w=majority&appName=Cluster0';

// Mongo connect
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});

// Book retrieval endpoint
app.get('/book', async (req, res) => {
  const { title, isbn } = req.query;

  if (!title && !isbn) {
    return res.status(400).send('Either title or ISBN query parameter is required');
  }

  try {
    const query = {};
    if (title) {
      query.title = new RegExp(title, 'i');
    }
    if (isbn) {
      query.isbn = isbn;
    }

    const book = await Book.findOne(query);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
