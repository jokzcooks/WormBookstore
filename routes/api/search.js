const express = require('express');
const router = express.Router();
const Book = require('../../db/models/Book'); 

// @route GET api/search/:searchTerm
// Find a book
router.get('/:searchTerm', async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm.toLowerCase().replace(/ /mg, "")
        console.log("looking for search term", searchTerm)
        const found = []
        const bookList = await Book.find({})
        bookList.forEach(book => {
            if (JSON.stringify(book).replace(/ /mg, "").toLowerCase().includes(searchTerm)) {
                found.push(book)
            }
        })
        res.status(200).json(found)
    } catch (e) {
        console.log(e)
        res.status(400).end()
    }
});

module.exports = router;
