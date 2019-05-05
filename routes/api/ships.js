const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const { User, Ship } = require('../../models');
const { validateAddShipInput } = require('../../validation');

// @route POST api/ships/addShip
// @desc Add ship for a user
// @acccess Private
router.post(
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
                let { name, length, width, speed, draft } = req.body;

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
                        User.findById(req.user.id).then(owner => {
                            if (owner) {
                                owner.ships.push(ship);
                                owner
                                    .save()
                                    .then(shipowner => {
                                        resp.status(200).json({
                                            msg: 'Ship added',
                                            name,
                                            id: ship._doc._id,
                                            owner: ship._doc.owner,
                                        });
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                    )
                    .catch(err => console.log(err));
            }
        });
    }
);

// @route GET api/ships/getShipList
// @desc Get ships for the user
// @acccess Private
router.get(
    '/getShipList',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        User.findById(req.user.id)
            .populate('ships')
            .then(ships => {
                resp.status(200).json(ships.ships);
            })
            .catch(err =>
                resp.status(400).json({
                    msg: 'Error finding ships for user ' + req.user.name,
                })
            );
    }
);

// @route POST api/ships/removeShip
// @desc Remove ship
// @acccess Private
router.post(
    '/removeShip',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        if (!req.body.id) {
            return resp.status(400).json({ error: 'Ship ID required' });
        }

        User.updateOne({ _id: req.user.id }, { $pull: { ships: req.body.id } })
            .then(() => {
                Ship.findOneAndDelete({ _id: req.body.id })
                    .then(() => {
                        return resp
                            .status(200)
                            .json({ msg: 'Successfully removed ship' });
                    })
                    .catch(err => {
                        console.log(err);
                        return resp.status(400).json({
                            err,
                            msg: 'Failure at Ship findAndDelete stage',
                        });
                    });
            })
            .catch(err => {
                return resp
                    .status(400)
                    .json({ err, msg: 'Not removed from user' });
            });
    }
);

module.exports = router;
