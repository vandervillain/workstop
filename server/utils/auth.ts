import express from 'express';
import passport from 'passport';
import url from 'url';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../logic/schema';

export function Init(app: express.Application) {
    const JWT_SECRET = "85616361-2be4-4eb1-8890-abb78ca0b420";
        
    // LOCAL STRATEGY AUTHENTICATE
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, cb) {
        User.findOne({email: email}, (err, user) => {
            if (!err) return cb(null, user);
        });
    }));

    app.post('/auth/local', function (req, res, next) {
        passport.authenticate('local', { session : false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
           req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed json web token with the contents of user object and return it in the response
               const token = jwt.sign(user, JWT_SECRET);
               return res.json({user, token});
            });
        })(req, res);
    });    

    //
    // FACEBOOK STATEGY AUTHENTICATE
    //
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.use(new FacebookStrategy({
        clientID: '511570319381876',
        clientSecret: 'bacdd0b3631ec25b8712643c646b5729',
        callbackURL: "http://localhost:3001/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(JSON.stringify(profile, null, 4));
        User.findOne({facebook_id: profile.id}, (err, user) => {
            if (!err) {
                if (user) {
                    return done(null, user);
                } 
                else {
                    new User({
                        facebook_id: profile.id,
                        name: profile.displayName
                    }).save((err, u) => {
                        return done(null, u);
                    })
                }
            }
        });
    }));

    app.use(passport.initialize());

    // FACEBOOK ROUTES
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect : 'http://localhost:3000/login'
    }), (req, res) => {
        var callbackUrl = 'http://localhost:3000/login/callback';
        User.findOne({facebook_id: req.user.facebook_id}, (err, user) => {
            if (!err) {
                // generate a signed json web token with the contents of user object and return it in the response
                const token = jwt.sign({id: user._id, name: user.name}, JWT_SECRET);
                res.redirect(url.format({
                    pathname: callbackUrl,
                    query: {
                        "token": token,
                        "user": user.name,
                    }
                }));
            }
         });

    });

    //
    // JWT AUTHORIZE
    //
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, function (jwtPayload, cb) {
        User.findOne({_id: jwtPayload.id}, (err, user) => {
            cb(null, user);
        });
    }));
}