var express = require('express');
var router = express.Router();
var checkSession = require('../assist/checkSession');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var House = require('../models/house');
var Host = require('../models/host');
var User = require('../models/user');
/* GET home page. */
router.get('/single', function(req, res, next) {
	var data;
	var lgSt = checkSession(req);
	House.findById(req.query.id, function(err, dataTemp) {
		data = dataTemp.toObject();
		Promise.all(data.hosts.map(function(id) {
			return new Promise(function(resolve, reject) {
				Host.findById(id).lean().exec(function(err, data){					
						resolve(data)
					})
			});
		})).then(function(hs) {
				if (lgSt) {
					User.findById(req.session.userId).exec(function(err, me) {
						if (me.like.length) {
								for(var i = 0; i < me.like.length; i++) {
									if (me.like[i] === req.query.id) {
										data.isLike = true;
										break;
									}
								}
							}
						data.hosts = hs;				
						data.dec_time = data.dec_time.getFullYear()+"-"+(data.dec_time.getMonth()+1)+"-"+data.dec_time.getDate();
						
						res.render('single/single', {data: data, logStatus: lgSt});
					})
				} else {
					data.hosts = hs;				
					data.dec_time = data.dec_time.getFullYear()+"-"+(data.dec_time.getMonth()+1)+"-"+data.dec_time.getDate();
					res.render('single/single', {data: data, logStatus: lgSt});
				}
				
				
				
			})
		})		
	});
module.exports = router;
