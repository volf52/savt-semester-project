const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateCoordInput(data) {
    let errors = {};

    data.fromLat = !isEmpty(data.fromLat) ? data.fromLat : '';
    data.fromLng = !isEmpty(data.fromLng) ? data.fromLng : '';
    data.toLat = !isEmpty(data.toLat) ? data.toLat : '';
    data.toLng = !isEmpty(data.toLng) ? data.toLng : '';

    if (Validator.isEmpty(data.fromLat)) {
        errors.fromLat = 'Departure Latitude is required';
    } else if (!Validator.isNumeric(data.fromLat, { no_symbols: false })) {
        errors.fromLat = 'Departure Latitude must be a number';
    }

    if (Validator.isEmpty(data.fromLng)) {
        errors.fromLng = 'Departure Longitude is required';
    } else if (!Validator.isNumeric(data.fromLng, { no_symbols: false })) {
        errors.fromLng = 'Departure Longitude must be a number';
    }

    if (Validator.isEmpty(data.toLat)) {
        errors.toLat = 'Arrival Latitude is required';
    } else if (!Validator.isNumeric(data.toLat, { no_symbols: false })) {
        errors.toLat = 'Arrival Latitude must be a number';
    }

    if (Validator.isEmpty(data.toLng)) {
        errors.toLng = 'Arrival Longitude is required';
    } else if (!Validator.isNumeric(data.toLng, { no_symbols: false })) {
        errors.toLng = 'Arrival Longitude must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
