const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    speed: {
        type: String,
        required: true,
    },
    draft: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = Ship = mongoose.model('ships', ShipSchema);
