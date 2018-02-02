const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const db = require('./config/base')
const http = require('http')
const knex= db.knex

const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;






/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || 3000;
app.set('port', port);


const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

return knex.migrate.latest({ directory: './config/migrations', tableName: 'schema_versions'})
  .then(() => {
  console.log("heee")
    return server.listen(port)
  })



