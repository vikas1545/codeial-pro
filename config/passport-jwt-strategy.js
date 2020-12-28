const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// creating options
let opts = {
    //creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'  // codeial is public key 
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err) {
            console.log('Error in finding the user from jwt ');
            return;
        }
        if(user) {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports = passport;
