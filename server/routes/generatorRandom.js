var History = require('../models/history').History;
var Progress = require('../models/progress').Progress;
var HttpError = require('../lib/error').HttpError;
var HistoryError = require('../models/history').HistoryError;
const { spawn } = require('child_process');

exports.get = function(req, res) {
  res.render('generatorRandom.hbs');
};


var progres = "";

exports.post = function(req, res, next) {
	progres = "";
 	var count = req.body.count;
	var result="";

	const bat = spawn('RandNumber.exe',  [count]);

	bat.stdout.on('data', (data) => {
  	  progres = data.toString();
  	  if(~data.toString().indexOf("result"))
  	  {
		result = data.toString().substr(6);
  	  }
  	  else
  	  {
  	  	Progress.getProgress(req.user.username, function(err, object) {
		    if (err) {
		        return next(err);
		    }
		    if(object.isStoped == true)
		    {
				  bat.kill('SIGINT');
		    }
		    else
		    {
		 		Progress.updateProgress(req.user.username, progres, true, function(err, object) {
				    if (err) {
				        return next(err);
				      }
				});
		    }
		});

  	  }
	});

	bat.on('exit', (code) => {
	  console.log(`Child exited with code ${code}`);
	  if(result!="")
	  {
	  console.log(result);
	  	  History.addNewItem(req.user.username, result, function(err, object) {
		    if (err) {
		        return next(err);
		      }
		   	Progress.updateProgress(req.user.username, 0, false, function(err, object) {
		    if (err) {
		        return next(err);
		    }
		 	 });
		   res.json(result);
		  });
	  }
	  else
	  {
	 Progress.getProgress(req.user.username, function(err, object) {
	  	Progress.updateProgress(req.user.username, object.progress, false, function(err, object) {
		    if (err) {
		        return next(err);
		    }
		  });
	  	res.status(205).json(object.progress);
	  })
	}
	});
};



exports.check = function (req, res) {
		Progress.getProgress(req.user.username, function(err, object) {
		    if (err) {
		        return next(err);
		    }
		    if(object.isInProcess == true)
		    {
				res.status(201).json(object.progress);
			}
			else
			{
				res.status(402).json();
			}

		    
		  });
}

exports.stopProc = function(req, res)
{
	Progress.StopProgress(req.user.username, function(err, object) {
		if (err) {
			return next(err);
		}
		res.send();
	});
}


exports.checkIsInProc = function(req, res)
{
	Progress.getProgress(req.user.username, function(err, object) {
		if (err) {
		        return next(err);
		    }
		if(object.isInProcess == true)
		{
			res.status(203).json();
		}
		else
		{
			res.json();
		}    
			
	});
}