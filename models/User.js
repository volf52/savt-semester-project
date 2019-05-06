const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    ships: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ships',
        },
    ],
    routes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'routes',
        },
    ],
});

module.exports = User = mongoose.model('users', UserSchema);
