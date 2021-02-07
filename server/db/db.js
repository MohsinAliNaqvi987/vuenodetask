const user = require("../models/user");
const forgetRequest = require("../models/forgetPassword");

module.exports = {
    saveUserToDatabase: data => {
        let userObject = {
            username:data.username,
            email:data.email,
            password:data.password,
            confirmPassword:data.confirmPassword,
            image:'',
            DOB:null,
            Education:''
        };
        let userObj = new user(userObject);
        return userObj.save();
    },
    getUserByEmail : email => {
      return user.findOne({email: email});
    },
    getUserByEmailAndPassword:data => {
      return user.findOne({email: data.email, password: data.password})
    },
    changePassword : data => {
      return user.updateOne({email: data.email} , {password: data.password});
    },
    updateProfile : data => {
      return user.updateOne({email: data.email} , {username: data.newName, DOB:data.dob, image:data.image, Education:data.education});
    },
    addForgetRequest : data => {
      let forgetRequestObject = {
        email:data.email,
        pinCode:data.pinCode,
        expiryTime:Date.now()+3600000
      };
      let forgetRequestObj = new forgetRequest(forgetRequestObject);
      return forgetRequestObj.save();
    },
    getForgetRequest : data => {
      return forgetRequest.findOne({pinCode: data.pinCode, expiryTime:{$gt: Date.now()}});
    }
}
