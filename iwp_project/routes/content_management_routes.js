const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var User = require('../models/user.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('DATABASE connected Properly!'))
//   .catch((err) => console.log('Error is ', err.message));

const router = express.Router();

router.get('/my_docs',(req,res)=>{
    res.render('my_docs');
})

module.exports = router;