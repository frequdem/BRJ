var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	nickname: {
		type: String,
		require: true
	},
	like: {
		type: [String],
		default: []
	},
	collect: {
		type: [String],
		default: []
	}

});
var User = mongoose.model('user',userSchema);
module.exports = User;