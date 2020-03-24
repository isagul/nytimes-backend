const express = require('express');
const router = express.Router();

const BookController = require('../controllers/book');

router.post('/add-to-cart', BookController.add_to_cart);
router.post('/favourites/add', BookController.add_to_favourite);
router.post('/favourites/delete', BookController.delete_favourite);
router.get('/', BookController.get_books);
router.post('/get-favourites', BookController.get_favourites);
router.delete('/delete', BookController.delete_book);

module.exports = router;
