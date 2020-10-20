const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var User = require('../models/user.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/my_docs',(req,res)=>{
    res.render('my_docs');
})

module.exports = router;