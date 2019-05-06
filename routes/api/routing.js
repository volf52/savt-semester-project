const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');

const { validateCoordInput } = require('../../validation');
const keys = require('../../config/keys');

const { RouteObj } = require('../../models');

const router = express.Router();

// @route GET api/routing/getRoute
// @desc Get route for the given coordinates
// @acccess Private
router.get(
    '/getRoute',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        const { errors, isValid } = validateCoordInput(req.body);

        if (!isValid) {
            return resp.status(400).json({ errors });
        }

        const url = `https://api.aquaplot.com/v1/route/from/${
            req.body.fromLng
        }/${req.body.fromLat}/to/${req.body.toLng}/${req.body.toLat}`;
        const auth = {
            username: keys.aquaplotUser,
            password: keys.aquaplotPass,
        };

        axios
            .get(url, {
                auth,
            })
            .then(response => {
                // console.log(response.data.features[0].properties);
                const tmp = response.data.features[0].properties;
                let encoded = encodeURIComponent(JSON.stringify(response.data));
                let geoURL = `http://geojson.io/#data=data:application/json,${encoded}`;
                const route = new RouteObj({
                    user: req.user.id,
                    ship: req.body.shipID,
                    departure: {
                        lat: req.body.fromLat,
                        lng: req.body.fromLng,
                    },
                    arrival: {
                        lat: req.body.toLat,
                        lng: req.body.toLng,
                    },
                    encodedGeoJson: encoded,
                    geoURL,
                    total_length: `${tmp.total_length}`,
                    seca_length: `${tmp.seca_length}`,
                    hra_length: `${tmp.hra_length}`,
                    arrivalUtc:
                        tmp.eta.arrivalTimeUtcWithConstantSpeedOverGround,
                    durationHours: `${tmp.eta.totalDurationHours}`,
                });

                route
                    .save()
                    .then(route => {
                        User.updateOne(
                            { _id: req.user.id },
                            { $push: { routes: route } }
                        )
                            .then(modified => {
                                // console.log(modified);
                                if (modified.nModified === 0) {
                                    throw new Error();
                                }
                                return resp.status(200).json({
                                    msg: 'Successfully saved',
                                    geoURL,
                                    total_length: `${tmp.total_length}`,
                                    seca_length: `${tmp.seca_length}`,
                                    hra_length: `${tmp.hra_length}`,
                                    arrivalUtc:
                                        tmp.eta
                                            .arrivalTimeUtcWithConstantSpeedOverGround,
                                    durationHours: `${
                                        tmp.eta.totalDurationHours
                                    }`,
                                });
                            })
                            .catch(err => {
                                return resp.status(400).json({
                                    msg: 'error saving route to user array',
                                });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        resp.status(400).json({ err, errors });
                    });
            })
            .catch(err => {
                console.log(err);
                return resp.status(400).json({ err });
            });
    }
);

// @route POST api/routing/removeRoute
// @desc Remove route
// @acccess Private
router.post(
    '/removeRoute',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        if (!req.body.id) {
            return resp.status(400).json({ error: 'Route ID required' });
        }

        User.updateOne({ _id: req.user.id }, { $pull: { routes: req.body.id } })
            .then(modified => {
                if (modified.nModified === 0) {
                    throw new Error();
                }
                RouteObj.findOneAndDelete({ _id: req.body.id })
                    .then(() => {
                        return resp
                            .status(200)
                            .json({ msg: 'Successfully removed route' });
                    })
                    .catch(err => {
                        console.log(err);
                        return resp.status(400).json({
                            err,
                            msg: 'Failure at route findAndDelete stage',
                        });
                    });
            })
            .catch(err => {
                return resp
                    .status(400)
                    .json({ err, msg: 'Route not removed from user' });
            });
    }
);

// @route GET api/routing/getRouteList
// @desc Get routes for the user
// @acccess Private
router.get(
    '/getRouteList',
    passport.authenticate('jwt', { session: false }),
    (req, resp) => {
        User.findById(req.user.id)
            .populate('routes')
            .then(routes => {
                resp.status(200).json(routes.routes);
            })
            .catch(err =>
                resp.status(400).json({
                    msg: 'Error finding routes for user ' + req.user.name,
                })
            );
    }
);

module.exports = router;
