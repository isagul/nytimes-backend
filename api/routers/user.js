const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');


const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);
router.delete('/delete', UserController.delete_user);
router.get('/', checkAuth, UserController.get_users);
router.post('/login', UserController.user_login);
router.post('/get-info', UserController.get_user_info);

module.exports = router;