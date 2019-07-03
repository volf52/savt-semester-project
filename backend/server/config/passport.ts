import { PassportStatic } from 'passport';
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    StrategyOptions as jwtStrOpts,
} from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github';
import { User } from '../models';
import keys from './keys';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretKey,
} as jwtStrOpts;

export default (passport: PassportStatic) => {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));
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

    passport.use(
        new GitHubStrategy(
            {
                clientID: 'a10348f38f1d61faa2aa',
                clientSecret: 'ead7c60106c30007c84822618fe4bc2528b986d0',
                callbackURL: 'http://localhost:3000/social/github/callback',
            },
            function(_accessToken, _refreshToken, profile, cb) {
                return cb(null, profile);
            }
        )
    );
};
