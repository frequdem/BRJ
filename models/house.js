var mongoose = require('mongoose');
var Host = require('./host');
var houseSchema = new mongoose.Schema({
	province: {
		type: String
	},
	city: {
		type: String
	}，
	county: {
		type: String
	},
	area: {
		type: Number
	},
	age: {
		type: Number
	},
	hosts: {
		type:[mongoose.Schema.Types.ObjectId],
		ref: 'Host'
	}
});
var House = mongoose.model('user',houseSchema);
module.exports = House;