let mongoose = require('mongoose');

let forgetRequest=mongoose.Schema({

  email:{
    type: String
  },
  expiryTime:{
    type:Date
  },
  pinCode:{
    type: Number
  }
});

module.exports = mongoose.model('forgetRequest',forgetRequest);
