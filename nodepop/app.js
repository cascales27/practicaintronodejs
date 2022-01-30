var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { isAPIRequest } = require('./lib/utils');


var app = express();

require('./lib/connectMongoose.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html", require("ejs").__express);
//app.use((req,res, next) => {
  //next(new Error('esto ha fallado'));
//})


app.locals.title = 'NodePop';

/**
 * Middelwares de nuestra app
 * Los evalua Express ante cada petición que recibe
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * rutas de mi api
 */
app.use('/', require('./routes/api/productos'));
app.use('/api/productos', require('./routes/api/productos'));

/**
 * Rutas de mi website 
 */
app.use('/',       require('./routes/index'));
app.use('/users',  require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // error de validacion
  if (err.array) {
    err.status =422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`; 
  }


  res.status(err.status || 500);
 //si es un error en el api respondo json
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
     return;
}

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});



module.exports = app;
