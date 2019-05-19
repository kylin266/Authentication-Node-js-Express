const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session')
//DB
const db = require('./config/db');
require('./config/passport')(passport);


mongoose.connect(db.url,{useNewUrlParser: true})
  .then(()=> console.log('DB connected'))
  .catch(err =>console.log(err));
//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Body parser
app.use(express.urlencoded({extended:false}));

//Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));






app.listen(3030,function(err){
  if (err) throw err;
  console.log('Server is running on port 3030');
});