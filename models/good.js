var mongoose = require('mongoose');
var goodSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	brand: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		require: true
	},
	hasLink: {
		type: Boolean,
		require: true
	},
	link: {
		type: String,
		default: ''
	},
	detail: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		require: true
	},
	hostComment: {
		type: String,
		require: true
	},
	hostStar: {
		type: String,
		require: true
	}
});
var Good = mongoose.model('good',goodSchema);
module.exports = Good;