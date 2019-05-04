const validateRegisterInput = require('./register');
const validateLoginInput = require('./login');
const validateAddShipInput = require('./addShip');
const validateCoordInput = require('./coords');

module.exports = {
    validateLoginInput,
    validateRegisterInput,
    validateAddShipInput,
    validateCoordInput,
};
