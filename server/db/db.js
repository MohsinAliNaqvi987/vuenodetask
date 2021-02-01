const user = require("../models/user");

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
    getUsersByEmail : email => {
      return user.find({email: email});
    },
    changePassword : data => {
      return user.updateOne({email: data.email} , {password: data.password});
    },
    updateProfile : data => {
      return user.updateOne({email: data.email} , {username: data.newName, DOB:data.dob, image:data.image, Education:data.education});
    }
}
