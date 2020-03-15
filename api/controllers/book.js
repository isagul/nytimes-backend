const mongoose = require('mongoose');

const Book = require('../models/book');
const User = require('../models/user');

exports.add_to_cart = (req, res, next) => {
  User.findOne({_id: req.body.user_id})
    .exec()
    .then(user => {
      console.log('user', user);
      if (!user) {
        return res.status(200).json({
          status: false,
          message: 'User not found!'
        })
      } else {
        const book = new Book({
          _id: mongoose.Types.ObjectId(),
          primary_isbn10:  req.body.primary_isbn10,
          primary_isbn13:  req.body.primary_isbn13,
          publisher:  req.body.publisher,
          description:  req.body.description,
          title:  req.body.title,
          author:  req.body.author,
          contributor:  req.body.contributor,
          book_image:  req.body.book_image,
          buy_links:  req.body.buy_links,
          book_price:  req.body.book_price,
          total_book_price:  req.body.total_book_price
        });

        User.findOneAndUpdate(
          { _id: req.body.user_id }, 
          { $push: { "basket": book } },
          {new: true}, 
          (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }        
            console.log(doc);
          }
        );

        book.save()
          .then(result => {            
            res.status(200).json({
              status: true,
              message: 'Book added successfully',
              addedBooks: {
                title: result.title,
                publisher: result.publisher
              }
            })
          })
          .catch(err => {
            res.status(200).json({
              status: false,
              error: err
            })
          })
      }
    })
}

exports.get_books = (req, res, next) => {
  User.findOne({_id: req.body.user_id})
    .exec()
    .then(user => {
      if (!user) {
        return res.status(200).json({
          status: false,
          message: 'User not found!'
        })
      } else {
        Book.find()
          .then(books => {
            res.status(200).json({
              count: books.length,
              books
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          })
      }
    })
    .catch()
}

exports.delete_book = (req, res, next) => {
  Book.deleteMany({primary_isbn10: req.body.primary_isbn10})
    .exec()
    .then(result => {
      res.status(200).json({
        status: true,
        message: 'Book deleted successfully'
      })
    })
    .catch(err => {
      res.status(200).json({
        status: false,
        error: err
      })
    })
}
