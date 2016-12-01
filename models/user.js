var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	}
});
var User = mongoose.model('user',userSchema);
module.exports = User;