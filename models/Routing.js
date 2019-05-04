const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    ship: {
        type: Schema.Types.ObjectId,
        ref: 'ships',
    },
    departure: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    arrival: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    encodedGeoJson: {
        type: String,
    },
    geoURL: {
        type: String,
    },
});

module.exports = RouteObj = mongoose.model('routes', RouteSchema);
