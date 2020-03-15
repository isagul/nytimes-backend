const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  primary_isbn10: String,
  primary_isbn13: String,
  publisher: String,
  description: String,
  title: String,
  author: String,
  contributor: String,
  book_image: String,
  buy_links: Array,
  book_price: Number,
  total_book_price: Number
})

module.exports = mongoose.model('Book', bookSchema);
