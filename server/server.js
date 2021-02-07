const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const router = require('./routes/router');
const mongoose = require('mongoose');
const db = require("./db/db");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/vueTask',{ useNewUrlParser: true , useUnifiedTopology: true})

app.use(express.json());
app.use('/vueapp',router);

app.use("/image", express.static('imageFolder'));

app.listen(3001, ()=>{
  console.log('Server started at port 3001');
})
