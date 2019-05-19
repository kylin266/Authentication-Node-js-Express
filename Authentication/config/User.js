const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String, 
        require : true
    },
    email : {
        type: String, 
        require : true
    },
    password : {
        type: String, 
        require : true
    },
    date : {
        type: Date, 
        require : Date.now
    },
});


var User = mongoose.model('User',UserSchema,'Student');
module.exports = User;
