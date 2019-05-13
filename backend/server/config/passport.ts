import mongoose from 'mongoose';
import { PassportStatic } from 'passport';
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    StrategyOptions as jwtStrOpts,
} from 'passport-jwt';
import keys from './keys';

import { User } from '../models';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretKey,
} as jwtStrOpts;

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    else return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
