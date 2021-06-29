var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var routes = require('./routes/routes.js')


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use('/', routes)


var port = process.env.PORT || 3000

app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}/`);
});