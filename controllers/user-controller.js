var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
        expiresIn: 2000
    })
}

exports.registerUser = async (req, res) => {
    console.log("register triggerd")
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' })
        }

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err })
            }
            return res.status(201).json(user);
        });
    })
};

exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                })
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match' })
            }
        })
    })
};

exports.getUserDetails = (req, res) => {
    console.log('get user triggerd')
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        return res.status(200).json({ 'data': user });
    })
}