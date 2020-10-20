const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
var User = require('../models/user.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }

router.post('/login', (req, res) => {
  if(!req.session.isLoggedIn){
    res.redirect('/');
  }
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj);
    User.find({ name: obj.name, password: obj.password })
      .then((user) => {
        if (user.length == 0) {
          var user = new User({
            name: obj.name,
            password: obj.password,
            img: '',
            pic1:'',
            pic2:'',
            pic3:'',
            pic4:'',
            pic5:''
          });
          user.save();
          n = obj.name;
          p = obj.password;
          res.render('img1', {
            msg: 'Data Uploaded!',
            vis1: 'show'
            // file: `uploads/${req.file.filename}`
          });
        }
        else {
          res.render('index', {
            msg: 'Data Not Uploaded!',
            vis1:'hide'
            // file: `uploads/${req.file.filename}`
          });
        }
      })
      .catch((err) => console.log('Error is ', err.message));
  });
  router.get('/welcome',(req,res)=>{
    res.render('form',{});
  })
  router.post('/signin',(req,res)=>{
    name = req.body.name;
    a=[];
    const testFolder = './public/uploads';
    const fs = require('fs');
  
    var files = fs.readdirSync(testFolder);
    console.log(files);
    for (i = 0; i < 5; i++) {
      a[i]=randomInt(0, 100);
    }
    const obj = JSON.parse(JSON.stringify(req.body))
    User.find({ name: obj.name})
      .then((user) => {
        if (user[0].password == req.body.password) {
          req.session.name = user[0].name;
          req.session.isLoggedIn = false;
          console.log(user);
          res.render('signin', {
            file1: files[a[0]],
            file2: files[a[1]],
            file3: files[a[2]],
            file4: files[a[3]],
            file5: files[a[4]],
            file6: user[0].pic1,
            file7: user[0].pic2,
            file8: user[0].pic3,
            file9: user[0].pic4,
            file10: user[0].pic5
          })
  
        }
        else {
          // res.render('student-login', {
          //   msg1: "",
          //   msg2: "Wrong password"
          // });
        }
      })
      .catch(err => {
        console.log('Error is ', err.message);
      })
    })
    router.post('/auth',(req,res)=>{
      const obj = JSON.parse(JSON.stringify(req.body))
        console.log(obj);
      if (obj.file6 == "true" && obj.file7 == "true" && obj.file8 == "true" && obj.file9 == "true" && obj.file10 == "true" && obj.file1 != "true" && obj.file2 != "true" && obj.file3 != "true" && obj.file4 != "true" && obj.file5 != "true"){
        req.session.isLoggedIn = true;
        res.render('home');
    }
      else{
        res.render('form');
      }
    })
    router.get('/news',(req,res) => {
      if(!req.session.isLoggedIn){
        res.redirect('/');
      }
        res.render('news');
    })
module.exports = router;