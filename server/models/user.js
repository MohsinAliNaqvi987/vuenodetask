let mongoose = require('mongoose');

let user=mongoose.Schema({

    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    image:{
        type: String,
        required: false
    },
    DOB:{
        type: Date,
        required: false
    },
    Education:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('user',user);
