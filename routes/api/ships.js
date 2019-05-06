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
                    .json({ msg: 'Ship with this name already exists' });
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
                                            msg: 'Ship added successfully',
                                            name,
                                            id: ship._id,
                                            owner: ship.owner,
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        resp.status(400).json({
                                            msg:
                                                'Error adding ship to the user list',
                                        });
                                    });
                            }
                        })
                    )
                    .catch(err => {
                        console.log(err);
                        resp.status(400).json({
                            msg: 'Error adding ship to database',
                        });
                    });
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

// @route GET api/ships/getShipName
// @desc Get ship name to use in other places
// @access Private

router.get(
    '/getShipName',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        Ship.findById(req.body.shipId)
            .then(ship => {
                return resp.status(200).json({ msg: 'successful', ship });
            })
            .catch(err => {
                return resp.status(400).json({ msg: 'unsuccessful' });
            });
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
            .then(modified => {
                if (modified.nModified === 0) {
                    throw new Error();
                }
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
                    .json({ err, msg: 'Ship not removed from user' });
            });
    }
);

module.exports = router;
