var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cors = require('cors');
const fileUpload = require('express-fileupload');

// middleware stuff
const middleware = require("./middleware");

// var internal = require('./routes/internal');
var common = require('./routes/common');
var auth = require('./routes/auth');
var user = require('./routes/user');
var role = require('./routes/role');
var actual_project = require('./routes/actual_project');
var bidding_project = require('./routes/bidding_project');
var system_paramater = require('./routes/system_parameter');
var client = require('./routes/client');
var project_organization = require('./routes/project_organization');
var actual_planning = require('./routes/actual_planning');
var bidding_planning = require('./routes/bidding_planning');
var actual_report = require('./routes/actual_report');
var bidding_report = require('./routes/bidding_report');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
  parameterLimit: 100000,
  limit: '50mb',
  extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use(cors());
app.use(middleware.mergeInput());
app.use(fileUpload());

app.use('/common', common);
app.use('/auth', auth);
app.use('/user', user);
app.use('/role', role);
app.use('/actual-project', actual_project);
app.use('/bidding-project', bidding_project);
app.use('/system-parameter', system_paramater);
app.use('/client', client);
app.use('/project-organization', project_organization);
app.use('/actual-planning', actual_planning);
app.use('/bidding-planning', bidding_planning);
app.use('/actual-report', actual_report);
app.use('/bidding-report', bidding_report);
// catch 404 and forward to error handler
// intialize for system internal tasks
// internal();
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: err.message,
    error: err.stack
  });
});

module.exports = app;
