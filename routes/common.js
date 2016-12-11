var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var router = express.Router();
var checkSession = require('../assist/checkSession');
var House = require('../models/house');
var User = require('../models/user');
/* add/remove likes. */
router.get('/like', function(req, res, next) {

	if (req.query.type === '0') { //不喜欢
		Promise.all([new Promise(function(resolve, reject) {
			House.findOneAndUpdate({id: mongoose.Schema.Types.ObjectId(req.query.id)}, {$inc: {likes: -1}}, function(err, data) {
					if (err) {
						reject();
					} else {
						resolve();
					}
			})
		}),new Promise(function(resolve, reject) {
				User.findOneAndUpdate({id: mongoose.Schema.Types.ObjectId(req.session.userId)}, {$pull: {like: req.query.id}}, function(err, data) {
					if (err) {
						reject();
					} else {
						resolve();
					}
				})
			})	
		]).then(function() {
			res.json({status: 200, msg: '', result: {}});
		})		
	} else {  //喜欢
		Promise.all(new Promise(function(resolve, reject) {
			House.findOneAndUpdate({id: mongoose.Schema.Types.ObjectId(req.query.id)}, {$inc: {likes: 1}}, function(err, data) {
					if (err) {
						reject();
					} else {
						resolve();
					}
			})
		}), new Promise(function(resolve, reject) {
				User.findOneAndUpdate({id: mongoose.Schema.Types.ObjectId(req.session.userId)}, {$addToSet: {like: req.query.id}}, function(err, data) {
					if (err) {
						reject();
					} else {
						resolve();
					}
				})
			})
		).then(function() {
			res.json({status: 200, msg: '', result: {}});
		}).catch()		
	}   
});

module.exports = router;
