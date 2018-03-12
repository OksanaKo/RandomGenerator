var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  username: {
    type: String,
    required: true
  },
  progress: {
    type: String,
    required: true
  },
  isInProcess: {
    type: Boolean,
    required: true
  },
  isStoped:
  {
    type: Boolean,
    required: true
  }
});

schema.statics.createProgress = function(username, callback) {
  var Progress = this;
  async.waterfall([
    function(callback) {    
        var progrObject = new Progress({username: username, progress: 0, isInProcess: false, isStoped: false});
        progrObject.save(function(err) {
          if (err) return callback(err);
          callback(null, progrObject);
        });
    }
  ], callback);
};

schema.statics.updateProgress = function(username, progress, isInP, callback) {
  var Progress = this;
  // var isInP=true;
  // if(progress == "100")
  // {
  //   isInP=false;
  // }
  Progress.update(
    {username: username}, 
    {progress:progress, isInProcess: isInP, isStoped: false},
     function(err, result){  
            if(err) return callback(err);
            callback(null, result);
  });

};

schema.statics.StopProgress = function(username, callback) {
  var Progress = this;
  var isInP=true;

  Progress.update(
    {username: username}, 
    {progress:"100", isInProcess: false, isStoped: true},
     function(err, result){  
            if(err) return callback(err);
            callback(null, result);
  });
};

schema.statics.getProgress = function(username, callback) {
  var Progress = this;

  Progress.findOne({username: username}, function(err, hist){
      if(err) return console.log(err);
       
      callback(null, hist); 
  });
};


exports.Progress = mongoose.model('Progress', schema);

function ProgressError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, ProgressError);

  this.message = message;
}

util.inherits(ProgressError, Error);

ProgressError.prototype.name = 'ProgressError';

exports.ProgressError = ProgressError