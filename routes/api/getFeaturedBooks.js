const express = require('express');
const mongoose = require('mongoose');
const Book = require('../WormBookstore-main/models/Book.js');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://team5:Team5@cluster0.qom8ksk.mongodb.net/Online_Bookstore?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Root route
app.get('/', async (req, res) => {
  try {
    // Pick 3 random books to feature on the home page
    const featuredBooks = await Book.aggregate([{ $sample: { size: 3 } }]);

    res.status(200).json(featuredBooks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Books by author endpoint
app.get('/books-by-author/:author', async (req, res) => {
  const author = req.params.author;

  if (!author) {
    return res.status(400).send('Author parameter is required');
  }

  try {
    const books = await Book.find({ author: new RegExp(author, 'i') });

    if (!books || books.length === 0) {
      return res.status(404).send('No books found for the specified author');
    }

    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
