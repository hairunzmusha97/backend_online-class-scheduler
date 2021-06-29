var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var routes = require('./routes/routes.js')
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/config');


var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.get('/', function (req, res) {
  return res.send('hello')
});

app.use('/api', routes);


mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.once('open', () => {
  console.log('mongoDb connection stablished');
});

conn.on('error', (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
})





// var app = express();
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(cors());
// app.use('/', routes)


var port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}/`);
});