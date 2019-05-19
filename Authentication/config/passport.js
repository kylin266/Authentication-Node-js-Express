const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../config/User');


module.exports = function(passport) {
    passport.use( new LocalStrategy ({usernameField:'email'},(email, password, done) => {
        //Match 
        User.findOne({email:email})
        .then(user =>{
            if (!user) {
                return done(null,false,{message:"Email not exist"});
            }
            if (password == user.password){
                return done(null, user);
            }
            else done(null,false,{message:"Wrong password"});
        })
        .catch(err => console.log(err));
    })
    );
    passport.serializeUser(function(user,done){
        done(null, user);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id,(err,user)=>{
        done(err, user);
        })
    });
}