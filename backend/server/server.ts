import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { routingRouter, shipRouter, userRouter } from './routes/api';

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
app.use('/api/users', userRouter);
app.use('/api/ships', shipRouter);
app.use('/api/routing', routingRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('..', 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
