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
			House.findOneAndUpdate({_id: req.query.id}, {$inc: {likes: -1}}, function(err, data) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
			})
		}),new Promise(function(resolve, reject) {
				User.findOneAndUpdate({_id: req.session.userId}, {$pull: {like: req.query.id}}, function(err, data) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
			})	
		]).then(function() {
			res.json({status: 200, msg: '', result: {}});
		}).catch(function(err) {
			console.log(err);
		});	
	} else {  //喜欢
		Promise.all([new Promise(function(resolve, reject) {
			House.findOneAndUpdate({_id: req.query.id}, {$inc: {likes: 1}},{new: true}, function(err, data) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
			})
		}), new Promise(function(resolve, reject) {
				User.findOneAndUpdate({_id: req.session.userId}, {$addToSet: {like: req.query.id}}, function(err, data) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
			})
		]).then(function() {
			res.json({status: 200, msg: '', result: {}});
		}).catch(function(err) {
			console.log(err);
		});		
	}   
});

module.exports = router;
