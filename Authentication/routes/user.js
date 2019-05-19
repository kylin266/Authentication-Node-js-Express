const express = require('express');
const router  = express.Router();
const passport = require('passport');
const User = require('../config/User');
//Login
router.get('/login',function(req,res){
    res.render('login');
})
//Register
router.get('/register',function(req,res){
    res.render('register');
})
//Register setup
router.post('/register',function(req,res) {
    var {name, email, password} = req.body;
    let errs = [];
    //Validate
    if (!name||!email||!password) {
        errs.push({msg:'Please fill in all fields'});
    }
    if (password.length < 6){
        errs.push({msg: 'Password is too short'});
    }
    if (errs.length > 0) {
        res.render('register',{
            errs,
            name,
            email,
            password
        });
    }
        else {
           User.findOne({email:email})
           .then(function(user){
               if (user){
            //user exists;
            errs.push({msg:'Email has existed'});
                res.render('register',{
                    errs,
                    name,
                    email,
                    password
                }); 
               } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                newUser.save()
                .then(function(user){
                    res.redirect('/user/login')
                });
               }
           });
    }

});

router.post('/login',(req,res,next) =>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',
        failureRedirect : '/user/login',
    }) (req,res,next);
});
router.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/user/login');
})
module.exports = router;
