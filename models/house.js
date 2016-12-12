var mongoose = require('mongoose');
var Host = require('./host');
var houseSchema = new mongoose.Schema({
	province: {
		type: String,
		require: true
	},
	county: {
		type: String,
		require: true
	},
	area: {
		type: Number,
		require: true
	},
	age: {
		type: Number,
		require: true
	},
	hosts: {
		type:[mongoose.Schema.Types.ObjectId],
		ref: 'Host'
	},
	dec_time: {
		type: Date,
		require: true
	},
	dec_cost: {
		type: Number,
		require: true
	},
	dec_period: {
		type: Number,
		default: 0
	},	
	dec_experience: {
		type: String,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	type: {
		type: String,
		require: true		
	},
	likes: {
		type: Number,
		default: 0
	},
	watchs: {
		type: Number,
		default: 0
	},
	collects: {
		type: Number,
		default: 0
	}
});
var House = mongoose.model('house',houseSchema);
module.exports = House;