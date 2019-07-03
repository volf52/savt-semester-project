import { RequestHandler, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import keys from '../../config/keys';
import { User } from '../../models';

const router = Router();

const githubAuth = passport.authenticate('github', { scope: 'user:email' });

const addSocketIdtoSession: RequestHandler = (req, resp, next) => {
    if (!req.session) return resp.status(401).json();
    req.session.socketId = req.query.socketId;
    next();
};

router.get('/github/callback', githubAuth, async (req, resp) => {
    const emails = (req.user.emails as Array<{ value: string }>).map(
        email => email.value
    );

    User.findOne({ email: { $in: emails } })
        .then(user => {
            if (!user) return resp.status(401).json();
            const payload = {
                id: user.id,
                name: user.name,
            };

            jwt.sign(
                payload,
                keys.secretKey as string,
                { expiresIn: '24h' },
                (_err, token) => {
                    // axios.defaults.headers.common['Authorization'] = token;
                    return resp.status(200).json({
                        success: true,
                        token: 'Bearer ' + token,
                        expiresIn: '24h',
                    });
                }
            );
        })
        .catch(err => {
            console.error(err);
            return resp.status(500).json();
        });
    // console.log(user);
    // if (!req.session) return resp.status(401).json();
    // io.in(req.session.socketId).emit('github', user);
});

router.get('/github', githubAuth);

export default router;
