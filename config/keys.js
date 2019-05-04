require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
    mongoURI: process.env['MONGODB_URI'],
    secretKey: process.env['SECRET_KEY'],
    aquaplotUser: process.env['AQUAPLOT_USER'],
    aquaplotPass: process.env['AQUAPLOT_PASS'],
};
