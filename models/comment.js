var mongoose = require('mongoose');
var User = require('./user');
var House = require('./house');

var commentSchema = new mongoose.Schema({
	from: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	to: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	in: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'House',
		require: true
	},
	content: {
		type: String,
		require: true
	},
	time: {
		type: Date,
		require: true
	}

});
var User = mongoose.model('user',userSchema);
module.exports = User;