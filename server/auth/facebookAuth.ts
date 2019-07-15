import express from 'express';
import passport from 'passport';
import url from 'url';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export function Init(app: express.Application) {
    var users = [],
        findUser = (id) => {
            for (var i = 0; i < users.length; i++) {
                if (id === users[i].id) return users[i];
            }
            return null;
        };

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
                "token": accessToken
                //"email": (profile.emails[0].value || '').toLowerCase()
            };
            users.push(newUser);
            return done(null, newUser);
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        //successRedirect : 'http://localhost:3000',
        failureRedirect : 'http://localhost:3000/login'
    }), (req, res) => {
        var callbackUrl = 'http://localhost:3000/login/callback';
        console.log(req.user)
        res.redirect(url.format({
            pathname: callbackUrl,
            query: {
               "token": req.user.token,
               "user": req.user.name,
             }
        }));
    });
}