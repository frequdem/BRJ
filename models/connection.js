var mongoose = require('mongoose');
mongoose.connect('mongodb://frequdem:abc123456@121.40.106.229:27017/BRJ/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are success!!");
});
module.exports = db;