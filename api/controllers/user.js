const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(200).json({
                    status: false,
                    error: {
                        message: 'Mail address already exists!'
                    }
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(200).json({
                            status: false,
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    status: true,
                                    message: 'User created successfully',
                                    userInfo: {
                                        _id: result._id,
                                        email: result.email
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
        })
}

exports.user_login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    status: false,
                    error: {
                        message: 'This mail address doesn\'t exist'
                    }
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            user_id: user._id
                        }, process.env.JWT_KEY, {
                            expiresIn: '6h'
                        })
                        return res.status(200).json({
                            status: true,
                            message: 'Auth successful',
                            token
                        })
                    } else {
                        return res.status(200).json({
                            status: false,
                            error: {
                                message: 'Auth failed'
                            }
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.delete_user = (req, res, next) => {
    User.findOne({ _id: req.body.user_id })
        .exec()
        .then(user => {
            if (!user) {
                res.status(200).json({
                    status: false,
                    error: {
                        message: 'User not found!'
                    }
                })
            } else {
                User.deleteOne({ _id: req.body.user_id })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            status: true,
                            message: 'User deleted successfully'
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

exports.get_users = (req, res, next) => {
    User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                count: users.length,
                users
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}