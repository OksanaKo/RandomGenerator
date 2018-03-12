var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  username: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.statics.addNewItem = function(username, result, callback) {
  var History = this;
  async.waterfall([
    function(callback) {    
        var historyObject = new History({username: username, result: result});
        historyObject.save(function(err) {
          if (err) return callback(err);
          callback(null, historyObject);
        });
    }
  ], callback);
};

schema.statics.getHistory = function(username, callback) {
  var History = this;

  History.find({username: username}, function(err, hist){
        
      if(err) return console.log(err);
       
      callback(null, hist); 
  });
};


exports.History = mongoose.model('History', schema);

function HistoryError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HistoryError);

  this.message = message;
}

util.inherits(HistoryError, Error);

HistoryError.prototype.name = 'HistoryError';

exports.HistoryError = HistoryError;