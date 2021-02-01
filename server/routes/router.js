const express = require("express");
const router = express.Router();
const verification = require("../middleware/verification");
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
  res.json({message: "Successfully Signed Up"});
});

router.post("/forgetPassword", verification.forgetEmail, verification.newPassword, verification.changePassword, (req,res) => {
  res.json({message: "Password Reset Successfully"});
});

router.post("/updateProfile", upload.single("image"), verification.updateEmail, verification.updateProfile, (req,res) => {
  res.json({message: "Updated Profile Successfully"});
});

module.exports = router;
