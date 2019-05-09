const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const { users, ships, routing } = require('./routes/api');
const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/ships', ships);
app.use('/api/routing', routing);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('..', 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));