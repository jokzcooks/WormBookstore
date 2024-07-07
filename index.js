const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const Books = require('./db');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(bodyParser.json());

app.get("/books", async (req, res) => {
    try {
        const bookList = await Books.find({})
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(bookList)
    } catch (e) {
        console.log(e)
        res.status(404).end()
    }
})

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Books.findOne({ISBN: req.params.id})
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(book)
    } catch (e) {
        console.log(e)
        res.status(404).end()
    }
})

app.get("/search/:searchTerm", async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm.toLowerCase().replace(/ /mg, "")
        console.log("looking for search term", searchTerm)
        const found = []
        const bookList = await Books.find({})
        bookList.forEach(book => {
            if (JSON.stringify(book).replace(/ /mg, "").toLowerCase().includes(searchTerm)) {
                found.push(book)
            }
        })
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json(found)
    } catch (e) {
        console.log(e)
        res.status(404).end()
    }
})



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`listening on ${port}`);