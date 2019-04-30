const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const { User, Ship } = require('../../models');
const { validateAddShipInput } = require('../../validation');

// @route GET api/ships/addShip
// @desc Add ship for a user
// @acccess Private
router.get(
    '/addShip',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        const { errors, isValid } = validateAddShipInput(req.body);

        if (!isValid) {
            return resp.status(400).json(errors);
        }

        Ship.findOne({ name: req.body.name }).then(ship => {
            if (ship)
                return resp
                    .status(400)
                    .json({ name: 'Ship with this name already exists' });
            else {
                let shipOwner = null;
                User.findById(req.user.id).then(user => {
                    if (!user) {
                        resp.status(400).json({
                            user: "Ship owner doesn't exist anymore",
                        });
                    }
                });

                let { name, length, width, speed, draft } = req.body;
                length = parseFloat(length);
                width = parseFloat(width);
                speed = parseFloat(speed);
                draft = parseFloat(draft);

                const newShip = new Ship({
                    name,
                    length,
                    width,
                    speed,
                    draft,
                    owner: req.user.id,
                });

                newShip
                    .save()
                    .then(ship =>
                        resp
                            .status(200)
                            .json({
                                msg: 'Ship added',
                                name,
                                id: ship._doc._id,
                                owner: ship._doc.owner,
                            })
                    )
                    .catch(err => console.log(err));
            }
        });
    }
);

module.exports = router;
