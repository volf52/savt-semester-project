import '@babel/polyfill';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import keys from './config/keys';
import passportInit from './config/passport';
import https from 'https';
import session from 'express-session';
import socketio from 'socket.io-client';
import cors from 'cors';
import {
    routingRouter,
    shipRouter,
    socialRouter,
    userRouter,
} from './routes/api';

const app = express();
const server = https.createServer(app);
const socket = socketio(server);

socket.on('connection', (socket: SocketIOClient.Socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
// Bodyparser middleware
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

app.use(
    session({
        secret: 'yo',
        resave: true,
        saveUninitialized: true,
    })
);
app.set('io', socket);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passportInit(passport);

// DB Config
const db = keys.mongoURI as string;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRouter);
app.use('/api/ships', shipRouter);
app.use('/api/routing', routingRouter);
app.use('/social', socialRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('..', 'frontend', 'build')));
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
