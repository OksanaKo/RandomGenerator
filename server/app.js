const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('./lib/mongoose');
const HttpError = require('./lib/error').HttpError;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbsHelpers = require('./middleware/hbsHelpers');
const hbs = require("hbs");

  const app = express();

app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs"); 

hbs.registerHelper("ifUser", hbsHelpers.ifUser);
hbs.registerHelper("getHistory", hbsHelpers.getHistory);

app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: "update",
  key: "sid",
  cookie: {
      "path": "/",
      "httpOnly": true,
      "maxAge": null
    },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

require('./routes')(app);

app.use(function(err, req, res, next) {

  if (typeof err == 'number') { 
     err = new HttpError(err);
  }
  if (err instanceof HttpError) {
     res.sendHttpError(err);
  } else {
      console.log(err);
      err = new HttpError(500);
      res.sendHttpError(err);
  }
});

var port = parseInt(process.argv[2]);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
