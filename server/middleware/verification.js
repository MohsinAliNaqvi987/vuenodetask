const db = require("../db/db");
const fs = require("fs");
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

module.exports={

    username:function(req, res, next) {
        var username = req.body.username;
        if (username !== "") {
            next();
        } else {
            res.status(400).json({ error: "Provide username" });
        }
    },

    email:function(req, res, next) {
        var email = req.body.email;
        if (email.substr(email.length-4) === '.com' && email.length>=6 && email.length<=50) {
          db.getUsersByEmail(email)
            .then((doc) => {
              if(doc.length !== 0){
                res.status(400).json({ error: "Email already used"});
              }
              else{
                next();
              }
            })
            .catch(err => {
              console.log(err);
            })
        } else {
            res.status(400).json({ error: "Provide correct email" });
        }
    },

    forgetEmail:function(req, res, next) {
      var email = req.body.email;
      if (email.substr(email.length-4) === '.com' && email.length>=6 && email.length<=50) {
        db.getUsersByEmail(email)
          .then((doc) => {
            if(doc.length === 0){
              res.status(400).json({ error: "No user with this email"});
            }
            else{
              next();
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        res.status(400).json({ error: "Provide correct email" });
      }
    },

    updateEmail:function(req, res, next) {
      var email = req.body.email;
      if (email.substr(email.length-4) === '.com' && email.length>=6 && email.length<=50) {
        db.getUsersByEmail(email)
          .then((doc) => {
            if(doc.length === 0){
              unlinkAsync(req.file.path);
              res.status(400).json({ error: "No user with this email"});
            }
            else{
              next();
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        res.status(400).json({ error: "Provide correct email" });
      }
    },

    password:function(req, res, next) {
        var password = req.body.password;
        if (password.length>=8) {
            next();
        } else {
            res.status(400).json({ error: "Choose stronger password" });
        }
    },

    newPassword:function(req, res, next) {
      var password = req.body.newPassword;
      if (password.length>=8) {
        next();
      } else {
        res.status(400).json({ error: "Choose stronger password" });
      }
    },

    confirmPassword:function(req, res, next) {
        var confirmPassword = req.body.confirmPassword;
        if (confirmPassword === req.body.password) {
            next();
        } else {
            res.status(400).json({ error: "Provide same password and confirm password" });
        }
    },

    saveUserToDb:function(req, res, next) {
        db.saveUserToDatabase({username:req.body.username, email:req.body.email,password:req.body.password,confirmPassword:req.body.confirmPassword})
            .then(()=>{
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ error:err });
            });
    },

    changePassword:function(req, res, next) {
      db.changePassword({email:req.body.email, password:req.body.newPassword})
        .then(()=>{
          next();
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ error:err });
        });
    },

    updateProfile:function(req, res, next) {
      db.updateProfile({email:req.body.email, newName:req.body.newName, image:req.file.originalname, dob:req.body.dob, education:req.body.education})
        .then(()=>{
          next();
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ error:err });
        });
    }

}
