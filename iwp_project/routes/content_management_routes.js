const express = require('express');
const multer = require('multer');
const path = require('path');
var User = require('../models/user.js');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/docs/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myDoc');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /pdf|docx|doc|odt/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Docs Only!');
    }
  }

router.get('/my_docs',(req,res)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/');
      }
      User.find({name: req.session.name}).then((user) => {
        res.render('my_docs',{
        msg:"",
        files: user.files
        })
        console.log(user.files);
      }).catch(err => {
                console.log('Error is ', err.message);
              });
})
router.post('/upload_doc',(req,res) => {
    upload(req, res, (err) => {
        if (err) {
          User.find({name: req.session.name}).then((user) => {
            res.render('my_docs',{
            msg:"Not Uploaded",
            files: user.files
            })}).catch(err => {
                console.log('Error is ', err.message);
              });
        } else {
          if (req.file == undefined) {
            User.find({name: req.session.name}).then((user) => {
                res.render('my_docs',{
                msg:"No File Selected",
                files: user.files
                })}).catch(err => {
                    console.log('Error is ', err.message);
                  });
          } else {
            User.updateOne({ name: req.session.name},{ $push: { files: {path: req.file.filename, name: req.body.name }}})
              .then((user) => {
                //do nothing
            })
              .catch(err => {
                console.log('Error is ', err.message);
              })
              User.find({name: req.session.name}).then((user) => {
                res.render('my_docs',{
                msg:"File Uploaded",
                files: user.files
                })}).catch(err => {
                    console.log('Error is ', err.message);
                  });
          }
        }
      });
})
module.exports = router;