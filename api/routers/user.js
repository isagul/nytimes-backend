const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);
router.delete('/delete', UserController.delete_user);
router.get('/', UserController.get_users);
router.post('/login', UserController.user_login);

module.exports = router;