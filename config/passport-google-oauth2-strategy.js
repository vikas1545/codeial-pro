const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for google login 
passport.use(new googleStrategy({
    clientID: "693129986751-b9jkortijhggt0cavlmg0er7hm0pd742.apps.googleusercontent.com",
    clientSecret: "GTImUZQoiku6JAzPfqRnuSWT",
    callbackURL: "http://localhost:8000/users/auth/google/callback"

},function(accessToken,refreshToken,profile,done){
    //find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err) {
            console.log("Error in google Strategy-passport",err);
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if(user){
            // if user found, set this user as req.user
            return done(null,user);
        } else {
            // if user is not found, create the user and set it as  req.user 
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err) {
                    console.log("Error in Creating user in google Strategy-passport",err);
                    return;             
                }
                return done(null,user);
            });
        }
    });
}));

module.exports = passport;