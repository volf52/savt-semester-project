require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
    mongoURI: process.env['MONGODB_URI'],
    secretKey: process.env['SECRET_KEY'],
};
