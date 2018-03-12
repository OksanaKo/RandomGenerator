var HttpError = require('../lib/error').HttpError;
var Progress = require('../models/progress').Progress;

function isAuth(req, res, next) {
  if (!req.session.user) {
    return next(new HttpError(401, "Ви не авторизовані"));
  }

  next();
};

function isUnAuth(req, res, next) {
  	if (req.session.user) {
  		console.log("Ви авторизовані");
    return next(new HttpError(401, "Ви авторизовані"));
 	
 	}
	else{
	  next();
	}
};

function isInProc(req, res, next) {
	Progress.getProgress(req.user.username, function(err, object) {
		    if (err) {
		      if (err instanceof HistoryError) {
		        return next(new HttpError(403, err.message));
		      } else {
		        return next(err);
		      }
		    }
		if (object.isInProcess === true) {
	  		console.log("Рахуємо попередній!");
		    return next(new HttpError(401, "Рахуємо попередній!"));
	 	}
		else{
		  next();
		}
	});
  	
};



module.exports = {
	isAuth,
	isUnAuth,
	isInProc
};