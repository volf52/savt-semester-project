const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');

const { validateCoordInput } = require('../../validation');
const keys = require('../../config/keys');

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
            return resp.status(400).json(errors);
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
                // console.log(response.data);
                let encoded = encodeURIComponent(JSON.stringify(response.data));
                return resp.status(200).json({
                    geoURL: `http://geojson.io/#data=data:application/json,${encoded}`,
                });
            })
            .catch(err => {
                console.log(err);
                return resp.status(400).json({ err });
            });
    }
);

module.exports = router;
