const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";

const upload_routes = require('./routes/upload_routes');
const auth_routes = require('./routes/auth_routes');

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE connected Properly!'))
  .catch((err) => console.log('Error is ', err.message));

// Init app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'7g3f9q80hfj10b8hf3b12n08b1cbeu3',resave:false, saveUninitialized:false}))

app.use(auth_routes);
app.use(upload_routes);
app.get('/', (req, res) => res.render('index'));

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));