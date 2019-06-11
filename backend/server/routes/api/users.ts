import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import keys from '../../config/keys';

// Load user model
import { User } from '../../models';

// Load input validation
import { validateLoginInput, validateRegisterInput } from '../../validation';

const router = express.Router();

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
                    keys.secretKey as string,
                    { expiresIn: 1 }, // one day
                    (err, token) => {
                        resp.json({
                            success: true,
                            token: 'Bearer ' + token,
                            expiresIn: 86400,
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

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
);

export default router;
