var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.find()
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
});


router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});


router.patch('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred!',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed!',
                error: {message: 'User not found'}
            });
        }
        //check whether password
        const field = req.body.field;
        if(field == 'password'){
            user[field] = bcrypt.hashSync(req.body.content, 10);
        }else{
            user[field] = req.body.content;
        }
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred?',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated user profile ' + user[field],
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    //var decoded = jwt.decode(req.query.token);
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'User Found!',
                error: {message: 'Message not found'}
            });
        }
        /*
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }*/
        user.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;