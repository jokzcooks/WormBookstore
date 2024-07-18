const express = require('express');
const router = express.Router();
const Book = require('../../db/models/Book'); 

// @route   POST api/book
// Create a book
router.post('/', async (req, res) => {
  const book = new Book({
    ...req.body
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/book
// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   GET api/book/featured
// Get 3 featured books
router.get('/featured', async (req, res) => {
  try {
    const featuredBooks = await Book.aggregate([{ $sample: { size: 3 } }]);
    res.json(featuredBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/book/coming
// Get 3 featured books
router.get('/coming', async (req, res) => {
  try {
    const comingSoonBooks = await Book.aggregate([{ $sample: { size: 3 } }]);
    res.json(comingSoonBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/book/isbn/:isbn
// Get book by ISBN
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/book/:id
// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/book/vendor/:vendor_id
// Get all books for a vendor_id
router.get('/vendor/:vendor_id', async (req, res) => {
  try {
    const books = await Book.find({ vendor_id: req.params.vendor_id });
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this vendor' });
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   PUT api/book/:id
// Update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/book/:id
// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/book/author/:author
// Get books by author
router.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  if (!author) {
    return res.status(400).json({ message: 'Author parameter is required' });
  }

  try {
    const books = await Book.find({ author: new RegExp(author, 'i') });
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for the specified author' });
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
