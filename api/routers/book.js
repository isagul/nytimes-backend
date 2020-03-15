const express = require('express');
const router = express.Router();

const BookController = require('../controllers/book');

router.post('/add-to-cart', BookController.add_to_cart);
router.get('/', BookController.get_books);
router.delete('/delete', BookController.delete_book);

module.exports = router;
