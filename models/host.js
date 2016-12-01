var mongoose = require('mongoose');
var hostSchema = new mongoose.Schema({
	hostName: {
		type: String,
		require: true
	},
	hostJob: {
		type: String,
		require: true
	},
	hostAge: {
		type: Number,
		require: true
	},
	_id: {
		type: Number,
		require: true
	}
});
var Host = mongoose.model('host',hostSchema);
module.exports = Host;