const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, resp) => {
    // Input Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return resp.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return resp.status(400).json({ email: 'Email already exists' });
        }
    });

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
                .save()
                .then(user => resp.json(user))
                .catch(err => console.log(err));
        });
    });
});

// @route POST api/users/login
// @desc Login user and return the JWT
// @access Public
router.post('/login', (req, resp) => {
    // Input Validation
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return resp.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return resp.status(400).json({ emailNotFound: 'Email not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User is valid
                const payload = {
                    id: user.id,
                    name: user.name,
                };

                jwt.sign(
                    payload,
                    keys.secretKey,
                    { expiresIn: 31556926 },
                    (err, token) => {
                        resp.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    }
                );
            } else {
                return resp
                    .status(400)
                    .json({ passwordIncorrect: 'Password is incorrect' });
            }
        });
    });
});

module.exports = router;
