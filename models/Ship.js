const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    length: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    width: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    speed: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    draft: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = Ship = mongoose.model('ships', ShipSchema);
