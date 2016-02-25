var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
   
    session = require('express-session');


module.exports = function(config, app) {
    // Setup Here
    passport.use(new GoogleStrategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackUrl: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
        console.log("HEY THIS IS GOOD!");
        return done(null, {username: 'fatman'});
    }));
    
    app.use(session({secret: config.sessionSecret, resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    //Serialization
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    
    return passport;
}