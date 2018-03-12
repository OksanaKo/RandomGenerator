var History = require('../models/history').History;
var HttpError = require('../lib/error').HttpError;
var HistoryError = require('../models/history').HistoryError;

exports.get = function(req, res) {
  History.getHistory(req.user.username, function(err, history) {
	    if (err) {
	      if (err instanceof HistoryError) {
	        return next(new HttpError(403, err.message));
	      } else {
	    return next(err);
	  }
	}
  	res.render('history.hbs', {history: history});
	});
};