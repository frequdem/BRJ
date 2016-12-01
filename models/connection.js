var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are success!!");
});
module.exports = db;