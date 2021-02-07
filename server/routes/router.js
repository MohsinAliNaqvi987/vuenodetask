const express = require("express");
const router = express.Router();
const verification = require("../middleware/verification");
const db = require('../db/db');
const nodemailer = require('nodemailer');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imageFolder/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }

};
const upload = multer({ storage: storage , limits:{
    fileSize:1024 * 1024 * 5
  },
  fileFilter:fileFilter
});

router.post("/signup", verification.username, verification.email, verification.password, verification.confirmPassword, verification.saveUserToDb, (req,res) => {
  db.getUserByEmail(req.body.email)
    .then((doc) => {
      res.json({data: doc});
    })
    .catch(err => {
      res.json({error: err});
    });
});

router.post("/login", verification.loginEmail, verification.loginPassword, (req,res) => {
  db.getUserByEmailAndPassword({email:req.body.email, password:req.body.password})
    .then((doc) => {
      if(doc)
        res.json({data: doc});
      else
        res.status(400).json({ error: "Wrong email or password"});
    })
    .catch(err => {
      res.json({error: err});
    });
});

router.post("/googleLogin", (req,res) => {
  db.getUserByEmail(req.body.email)
    .then((doc) => {
      if(doc)
        res.json({data: doc});
      else
        res.status(400).json({ error: "Cannot login through Google, Signup required"});
    })
    .catch(err => {
      res.json({error: err});
    });
});

router.post("/forgetPassword", verification.forgetEmail, (req,res) => {
  var pinCode = Math.floor(1000+Math.random()*9000);
  db.addForgetRequest({email:req.body.email, pinCode:pinCode}).then( () => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohsinmailtester@gmail.com',
        pass: 'mohsin123'
      }
    });

    var mailOptions = {
      from: 'mohsin.ali.naqvi987@gmail.com',
      to: req.body.email,
      subject: "Reset Password",
      html: `
          <h1>Reset Password</h1>
          <h2>Your pin code is : ${pinCode}</h2>
          <a href="http://localhost:4000/resetpassword/">Reset Password</a>
      `
    };

    transporter.sendMail(mailOptions).then(()=>{
      res.json({message:"Check your email"});
    })
    .catch(()=>{
      res.status(500).json({error:"Try again later"})
    })}
  )
  .catch(err => {
    res.status(500).json({error:err});
  });
});

router.post("/resetPassword", verification.newPassword, (req,res) => {
  db.getForgetRequest({pinCode:req.body.pinCode})
    .then((doc)=>{
      if(doc){
        db.changePassword({email:doc.email, password:req.body.newPassword})
          .then(()=>{
            res.json({message:"Password Reset Successfully"});
          })
          .catch(err => {
            res.status(400).json({ error:err });
          });
      }
      else
        res.status(400).json({error: "This pincode is wrong or expired. Try again!"});
    })
    .catch();
});

router.post("/updateProfile", upload.single("image"), verification.updateEmail, verification.updateProfile, (req,res) => {
  db.getUserByEmail(req.body.email)
    .then((doc) => {
      res.json({data: doc});
    })
    .catch(err => {
      res.json({error: err});
    });
});

module.exports = router;
