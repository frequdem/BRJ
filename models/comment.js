var mongoose = require('mongoose');
var User = require('./user');
var House = require('./house');

var commentSchema = new mongoose.Schema({
	from: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'user',
		require: true
	},
	to: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'user',
		default: mongoose.Schema.Types.ObjectId(0)
	},
	houseId: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'house',
		require: true
	},
	content: {
		type: String,
		require: true
	},
	time: {
		type: Date,
		require: true
	},
	status: {
		type: Boolean,
		require: true,
		default: false
	}

});
var Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;