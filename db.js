const mongoose = require("mongoose");
require("dotenv").config()
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const BookSchema = new mongoose.Schema({
        "_id": mongoose.Schema.Types.ObjectId,
        "ISBN": String,
        "category": String,
        "title": String,
        "author": String,
        "rating": Number,
        "edition": String,
        "publish_year": Number,
        "publisher": String,
        "cover_pic": String,
        "qty_in_stock": Number,
        "min_threshold": Number,
        "buy_price": Number,
        "sell_price": Number,
        "vendor_id": mongoose.Schema.Types.ObjectId,
        "description": String
});

const Books = mongoose.model('books', BookSchema);

module.exports = Books