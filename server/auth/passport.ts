import express from 'express';
import passport from 'passport';
import url from 'url';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export function Init(app: express.Application) {
    const JWT_SECRET = "85616361-2be4-4eb1-8890-abb78ca0b420";
    var users = [],
        findUser = (id) => {
            for (var i = 0; i < users.length; i++) {
                if (id === users[i].id) return users[i];
            }
            return null;
        };
        
    // LOCAL STRATEGY AUTHENTICATE
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, cb) {
        var user = findUser(email);
        if (user) {
            console.log('existing user');
            return cb(null, user);
        }
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
        var user = findUser(profile.id);
        if (user) {
            console.log('existing user');
            return done(null, user);
        } 
        else {
            console.log('create new user');
            var newUser = {
                "id": profile.id,
                "name": profile.displayName,
                //"email": (profile.emails[0].value || '').toLowerCase()
            };
            users.push(newUser);
            return done(null, newUser);
        }
    }));

    app.use(passport.initialize());

    // FACEBOOK ROUTES
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect : 'http://localhost:3000/login'
    }), (req, res) => {
        var callbackUrl = 'http://localhost:3000/login/callback';

        req.login(req.user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed json web token with the contents of user object and return it in the response
            const token = jwt.sign(req.user, JWT_SECRET);
            res.redirect(url.format({
                pathname: callbackUrl,
                query: {
                   "token": token,
                   "user": req.user.name,
                }
            }));
         });

    });

    //
    // JWT AUTHORIZE
    //
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        var user = findUser(jwtPayload.id);
        cb(null, user);
    }));
}