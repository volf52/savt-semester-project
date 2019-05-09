const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateAddShipInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.length = !isEmpty(data.length) ? data.length : '';
    data.width = !isEmpty(data.width) ? data.width : '';
    data.speed = !isEmpty(data.speed) ? data.speed : '';
    data.draft = !isEmpty(data.draft) ? data.draft : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.length)) {
        errors.length = 'Length is required';
    } else if (!Validator.isNumeric(data.length, { no_symbols: false })) {
        errors.length = 'Length must be a number';
    }

    if (Validator.isEmpty(data.width)) {
        errors.width = 'Width is required';
    } else if (!Validator.isNumeric(data.width, { no_symbols: false })) {
        errors.width = 'Width must be a number';
    }

    if (Validator.isEmpty(data.speed)) {
        errors.speed = 'Speed is required';
    } else if (!Validator.isNumeric(data.speed, { no_symbols: false })) {
        errors.speed = 'Speed must be a number';
    }

    if (Validator.isEmpty(data.draft)) {
        errors.draft = 'Draft value is required';
    } else if (!Validator.isNumeric(data.draft, { no_symbols: false })) {
        errors.draft = 'Draft value must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
